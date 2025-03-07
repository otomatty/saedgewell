import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

import { Alert, AlertDescription, AlertTitle } from '@kit/ui/alert';

/**
 * @name AuthErrorAlert
 * @param error This error comes from Supabase as the code returned on errors
 * This error is mapped from the translation auth:errors.{error}
 * To update the error messages, please update the translation file
 * https://github.com/supabase/gotrue-js/blob/master/src/lib/errors.ts
 * @constructor
 */
export function AuthErrorAlert({
  error,
}: {
  error: Error | null | undefined | string;
}) {
  if (!error) {
    return null;
  }

  const DefaultError = 'エラーが発生しました。もう一度お試しください。';

  return (
    <Alert variant={'destructive'}>
      <ExclamationTriangleIcon className={'w-4'} />

      <AlertTitle>認証エラー</AlertTitle>

      <AlertDescription data-test={'auth-error-message'}>
        {DefaultError}
      </AlertDescription>
    </Alert>
  );
}
