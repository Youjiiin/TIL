import { useEffect, useRef, useState } from 'react';
import './App.css';
import Button from './components/Button';
import Input from './components/Input';
import Label from './components/Label';
import { useSetLocale, useTranslate } from './translate';

function App() {
  const [values, setValues] = useState<{
    username: string;
    password: string;
  }>({
    username: '',
    password: '',
  });
  // useState: 배열의 경우에는 초깃값이 비어있는데, 타입추론이 never[]로 되이게 제네릭으로 타입을 설정해주어야 한다.
  const formRef = useRef<HTMLFormElement>(null);
  // useRef: 제네릭으로 대상이 되는 노드의 타입을 정해줄 수 있다. 초깃값은 null 로 지정
  const t = useTranslate();
  const setLocale = useSetLocale();

  useEffect(() => {
    const form: any = formRef.current;
    if (form) form['username'].focus();
  }, []);

  function handleChange(e: any) {
    const { name, value } = e.target;
    const nextValues = {
      ...values,
      [name]: value,
    };
    setValues(nextValues);
  }

  function handleClick(e: any) {
    e.preventDefault();

    const message = `${values.username}님 환영합니다`;
    alert(message);
  }

  return (
    <form className="login" ref={formRef}>
      <h1 className="login-title">{t('signin')}</h1>
      <Label>{t('username')}</Label>
      <Input
        id="username"
        name="username"
        type="text"
        placeholder={t('email or phone number')}
        value={values.username}
        onChange={handleChange}
      />
      <Label>{t('password')}</Label>
      <Input
        id="password"
        name="password"
        type="password"
        placeholder={t('password')}
        value={values.password}
        onChange={handleChange}
      />
      <div className="login-forgot">
        <a className="login-forgot-link" href="#login">
          {t('forgot your password?')}
        </a>
      </div>
      <Button id="submit" onClick={handleClick}>
        {t('signin')}
      </Button>
      <div className="login-signup">
        {t('new user?')}{' '}
        <a className="login-signup-link" href="#signup">
          {t('signup')}
        </a>
      </div>
      <div className="locale">
        <span onClick={() => setLocale('ko')}>한국어</span> |{' '}
        <span onClick={() => setLocale('en')}>English</span>
      </div>
    </form>
  );
}

export default App;
