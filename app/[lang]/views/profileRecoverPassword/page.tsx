'use client';
import { Locale } from 'i18n-config';
import ChangePassword from './components/ChangePassword';

const RecoverPassword = ({
  params: { lang },
}: {
  params: { lang: Locale };
}) => {
  return (
    <div>
      <ChangePassword
        params={{ lang }}
      />
    </div>
  );
};

export default RecoverPassword;