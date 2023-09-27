import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/Switch';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/Card';
import { useState, ChangeEvent, SyntheticEvent, FC } from 'react';
import { saveAs } from 'file-saver';

const FileUploader: FC = () => {
  const [checked, setChecked] = useState(false);
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheckedChange = () => setChecked((prevChecked) => !prevChecked);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFile(e.target.files ? e.target.files[0] : null);

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setText(e.target.value);

  const handleFormSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!checked) {
      handleFileSubmit();
    } else {
      handleTextSubmit();
    }
  };

  const handleFileSubmit = () => {
    setError(null);
    if (!file) {
      setError('No file selected.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const content = e.target?.result?.toString();
      if (!content) return;
      reader.abort();
      processContent(content);
    };
    reader.onerror = () => setError('Failed to read the file.');
    reader.readAsText(file);
  };

  const handleTextSubmit = () => {
    setError(null);
    if (text.trim() === '') {
      setError('Text field is empty.');
      return;
    }
    processContent(text);
  };

  const processContent = (content: string) => {
    setError(null);
    const lines = content.split('\n');
    if (lines.length < 4) {
      setError('Content format is invalid.');
      return;
    }
    const [_, instruction1, instruction2, message] = lines;
    const result = checkInstructions(instruction1, instruction2, message);
    const blob = new Blob([result], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'output.txt');
  };

  const checkInstructions = (
    instruction1: string,
    instruction2: string,
    message: string
  ): string => {
    const isInstruction1InMessage = isInstructionInMessage(
      instruction1,
      message
    );
    const isInstruction2InMessage = isInstructionInMessage(
      instruction2,
      message
    );
    return `${isInstruction1InMessage ? 'SI' : 'NO'}\n${
      isInstruction2InMessage ? 'SI' : 'NO'
    }`;
  };

  const isInstructionInMessage = (
    instruction: string,
    message: string
  ): boolean => {
    let instructionPointer = 0;
    let messagePointer = 0;

    while (
      instructionPointer < instruction.length &&
      messagePointer < message.length
    ) {
      if (
        instruction[instructionPointer].toLowerCase() ===
        message[messagePointer].toLowerCase()
      ) {
        instructionPointer++;
      }
      messagePointer++;
    }

    return instructionPointer === instruction.length;
  };

  function reset(e: SyntheticEvent) {
    e.preventDefault();
    setText('');
    setFile(null);
    setChecked(false);
  }

  return (
    <>
      <div className="flex justify-center mt-10">
        <Card className="w-[450px]">
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <form onSubmit={handleFormSubmit}>
            <CardHeader>
              <CardTitle>Submit Your Information</CardTitle>
              <CardDescription>
                You can either upload a file or enter the details manually in
                the text area below.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-end items-center space-x-2 mb-5">
                <Switch
                  id="upload-mode"
                  checked={checked}
                  onCheckedChange={handleCheckedChange}
                />
                <Label htmlFor="upload-mode">Enter manually</Label>
              </div>
              {checked ? (
                <Textarea
                  value={text}
                  onChange={handleTextChange}
                  placeholder="Type your message here."
                  id="message"
                  
                />
              ) : (
                <Input
                  id="file"
                  type="file"
                  onChange={handleFileChange}
                  
                />
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant={'ghost'} onClick={reset}>
                Reset
              </Button>
              <Button type="submit">Decrypt</Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
};

export default FileUploader;
