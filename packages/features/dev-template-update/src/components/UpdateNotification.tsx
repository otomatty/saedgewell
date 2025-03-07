'use client';

import { useEffect, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@kit/ui/alert';
import { Button } from '@kit/ui/button';

const LAST_PULL_KEY = 'last_template_pull';
const CHECK_INTERVAL = 24 * 60 * 60 * 1000; // 24時間

export function UpdateNotification() {
  const [needsUpdate, setNeedsUpdate] = useState(false);

  useEffect(() => {
    const checkLastPull = () => {
      const lastPull = localStorage.getItem(LAST_PULL_KEY);
      if (!lastPull) {
        setNeedsUpdate(true);
        return;
      }

      const lastPullDate = new Date(lastPull);
      const now = new Date();
      if (now.getTime() - lastPullDate.getTime() > CHECK_INTERVAL) {
        setNeedsUpdate(true);
      }
    };

    checkLastPull();
  }, []);

  if (!needsUpdate) return null;

  return (
    <Alert className="mb-4">
      <AlertTitle>テンプレートの更新確認</AlertTitle>
      <AlertDescription>
        親テンプレートからの更新を確認してください。最後の更新から24時間以上が経過しています。
        <div className="mt-2">
          <Button
            variant="outline"
            onClick={() => {
              localStorage.setItem(LAST_PULL_KEY, new Date().toISOString());
              setNeedsUpdate(false);
            }}
          >
            確認しました
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
}
