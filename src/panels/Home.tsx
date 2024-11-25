import { FC } from 'react';
import {
  Panel,
  Header,
  Group,
  Cell,
  Div,
  Avatar,
  NavIdProps,
} from '@vkontakte/vkui';
import { UserInfo } from '@vkontakte/vk-bridge';
// import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import LuckTester from '../components/LuckTester';

export interface HomeProps extends NavIdProps {
  fetchedUser?: UserInfo;
}

export const Home: FC<HomeProps> = ({ id, fetchedUser }) => {
  const { photo_200, city, first_name, last_name } = { ...fetchedUser };

  return (
    <Panel id={id}>
      {fetchedUser && (
        <Group header={<Header mode="secondary"></Header>}>
          <Cell before={photo_200 && <Avatar src={photo_200} />} subtitle={city?.title}>
            {`${first_name} ${last_name}`}
          </Cell>
        </Group>
      )}

      <Group header={<Header mode="secondary"></Header>}>
        <Div>
          <LuckTester />
        </Div>
      </Group>
    </Panel>
  );
};
