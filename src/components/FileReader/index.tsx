import { Button } from '@/components/ui/Button';
import { Switch } from '@/components/ui/Switch';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/Card';
import React from 'react';

const FileReader = () => {
  const [checked, setChecked] = React.useState(false);
  const handleChange = () => {
    setChecked(!checked);
  };
  return (
    <>
      <div className="flex justify-center mt-10">
        <Card className="w-[450px]">
          <CardHeader>
            <CardTitle>Submit Your Information</CardTitle>
            <CardDescription>
              You can either upload a file or enter the details manually in the
              text area below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex justify-end items-center space-x-2">
                <Switch
                  id="upload-mode"
                  checked={checked}
                  onCheckedChange={handleChange}
                />
                <Label htmlFor="upload-mode">Enter manually</Label>
              </div>
              {!checked && (
                <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
                  <Label htmlFor="picture">File</Label>
                  <Input id="picture" type="file" />
                </div>
              )}
              {checked && (
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="message">Your message</Label>
                  <Textarea
                    placeholder="Type your message here."
                    id="message"
                  />
                </div>
              )}
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>Decrypt</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default FileReader;
