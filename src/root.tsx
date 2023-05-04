import { Counter } from './components/counter/counter';
import { Icon } from './components/icon/icon';
import { Logo } from './components/logo/logo';

export default () => {
  return (
    <>
      <head>
        <meta charSet="utf-8" />
        <title>Qwik Blank App</title>
      </head>
      <body>
        <Logo />
        <Counter />
        <Icon title="Test" size={32}/>
      </body>
    </>
  );
};
