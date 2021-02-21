import { ThreadListItemModel } from '@models';
import React, { ReactElement } from 'react';
import { Divider, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Folder } from '@material-ui/icons';
import { Link as RouterLink, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';

interface ThreadListItemProps {
  thread: ThreadListItemModel;
}

interface Props {
}

const ThreadItem = styled(ListItem)<Props>`
  display: flex;
  align-items: center;

  .thread-title {
    flex: 1;
  }
`;

export function ThreadListItem({ thread }: ThreadListItemProps): ReactElement {
  const match = useRouteMatch();
  const postBody: string = thread.last_post.body;
  const slicedPostBody: string = postBody.length > 10
    ? postBody.slice(0, 10) + '...'
    : postBody;


  return (
    <>
      {/*@ts-ignore*/ }
      <ThreadItem>
        <ListItemIcon>
          <Folder />
        </ListItemIcon>
        <RouterLink className="thread-title" to={ match.url + '/thread/' + thread.id }>
          <ListItemText>{ thread.name }</ListItemText>
        </RouterLink>
        <ThreadDetails>
          <span>Last post: <span>{ slicedPostBody }</span></span>
        </ThreadDetails>
      </ThreadItem>
      <Divider />
    </>
  );
}

const ThreadDetails = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 14px;
`;