import { AppProps } from 'next/app';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { Button } from 'src/components/Button';
import { Ranking } from 'src/components/Ranking';
import { TextArea } from 'src/components/TextArea';
import { User } from 'src/entities/user';
import { useAsync } from 'src/hooks/useAsync';
import { fetchContributionCalendar } from 'src/utils/github';

const TARGET_GITHUB_USER_ALIAS = 'target-github-users';

const Index: React.FC<AppProps> = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [users, setUsers] = useState<User[]>([]);

  const fn = async () => {
    try {
      const githubIds = textAreaRef.current.value.split(/\n/);
      localStorage.setItem(TARGET_GITHUB_USER_ALIAS, textAreaRef.current.value);
      const requests = githubIds.map(async (id) => {
        const calender = await fetchContributionCalendar(id);
        return { id, calender };
      });
      const responses = await Promise.all(requests);
      setUsers(responses);
    } catch (error) {
      throw new Error();
    }
  };
  const { isLoading, invokeFn } = useAsync(() =>
    toast.promise(fn(), {
      loading: '取得中...',
      success: <b>情報の取得に成功しました。</b>,
      error: (
        <b>
          情報の取得に失敗しました。
          <br />
          入力したGithubIdに間違いがないか確認してください。
        </b>
      ),
    }),
  );

  useEffect(() => {
    const beforeText = localStorage.getItem(TARGET_GITHUB_USER_ALIAS);
    if (beforeText) {
      textAreaRef.current.value = beforeText;
    }
  }, []);

  const handleCheckButtonClick = useCallback(() => {
    invokeFn();
  }, [invokeFn]);

  return (
    <div className="flex flex-col items-center py-16">
      <h1 className="mb-16 text-3xl font-bold text-accent-primary-regular select-none">
        Contributions Ranking
      </h1>
      <div></div>
      <p className="mb-8 text-center select-none">
        下記の項目に入力したGitHubアカウントのコミット数を取得し、
        <br />
        その情報を基にランキングを作成します。
      </p>
      <TextArea
        ref={textAreaRef}
        className="mb-8 w-11/12 max-w-200 min-h-64"
        placeholder={'GITHUB_ID_01\nGITHUB_ID_02\nGITHUB_ID_03'}
      />

      <Tabs className="mb-8 w-11/12 max-w-128">
        <TabList className="flex justify-center">
          <Tab>一週間</Tab>
          <Tab>一ヶ月</Tab>
          <Tab>半年</Tab>
          <Tab>一年</Tab>
        </TabList>
        <TabPanel>
          <Ranking users={users} targetPeriod={7} />
        </TabPanel>
        <TabPanel>
          <Ranking users={users} targetPeriod={30} />
        </TabPanel>
        <TabPanel>
          <Ranking users={users} targetPeriod={180} />
        </TabPanel>
        <TabPanel>
          <Ranking users={users} targetPeriod={365} />
        </TabPanel>
      </Tabs>

      <Button
        className="py-4 px-5 w-full max-w-64"
        disabled={isLoading}
        onClick={handleCheckButtonClick}
      >
        {!isLoading ? 'contribution数を取得する' : '取得中...'}
      </Button>
    </div>
  );
};

export default Index;
