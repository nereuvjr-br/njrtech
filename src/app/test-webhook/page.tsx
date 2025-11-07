'use client';

import { handleQuoteRequest } from '@/ai/flows/handle-quote-request';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function TestWebhookPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const protocol = `TEST-${Date.now()}`;
      const mockData = {
        name: 'Test User',
        email: 'test@example.com',
        whatsapp: '1234567890',
        company: 'Test Inc.',
        projectDescription: 'This is a test project from the test page.',
        protocol: protocol,
      };
      const response = await handleQuoteRequest(mockData);
      setResult(`Webhook sent successfully! Protocol: ${protocol}. AI Response: ${response.confirmationMessage}`);
    } catch (e: any) {
      console.error('Error sending webhook:', e);
      setError(e.message || 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Webhook Test Page</CardTitle>
          <CardDescription>
            Click the button to send a test request to the n8n webhook.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button onClick={handleClick} disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Send Test Webhook
          </Button>
          {result && (
            <div className="rounded-md border border-green-500 bg-green-50 p-4 text-sm text-green-700">
              <p className="font-bold">Success!</p>
              <p>{result}</p>
            </div>
          )}
          {error && (
            <div className="rounded-md border border-red-500 bg-red-50 p-4 text-sm text-red-700">
              <p className="font-bold">Error!</p>
              <p>{error}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
