import { Icon } from './components/icon/icon';
import {Add} from './icons/add';
import { Branch } from './icons/branch';

export default () => {
  return (
    <>
      <head>
        <meta charSet="utf-8" />
        <title>Qwik Blank App</title>
      </head>
      <body>
        <Icon title="Test" size={32}/>
        <Add title="Add" size={24}/>
        <Branch title="Create branch" />
      </body>
    </>
  );
};
