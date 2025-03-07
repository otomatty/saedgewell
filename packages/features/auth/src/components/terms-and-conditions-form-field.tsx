import Link from 'next/link';

import { Checkbox } from '@kit/ui/checkbox';
import { FormControl, FormField, FormItem, FormMessage } from '@kit/ui/form';

export function TermsAndConditionsFormField(
  props: {
    name?: string;
  } = {}
) {
  return (
    <FormField
      name={props.name ?? 'termsAccepted'}
      render={({ field }) => {
        return (
          <FormItem>
            <FormControl>
              <label
                htmlFor={field.name}
                className={'flex items-start space-x-2 py-2'}
              >
                <Checkbox required name={field.name} id={field.name} />

                <div className={'text-xs'}>
                  以下の
                  <Link
                    target={'_blank'}
                    className={'underline'}
                    href={'/terms-of-service'}
                  >
                    利用規約
                  </Link>
                  と
                  <Link
                    target={'_blank'}
                    className={'underline'}
                    href={'/privacy-policy'}
                  >
                    プライバシーポリシー
                  </Link>
                  に同意します
                </div>
              </label>
            </FormControl>

            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
