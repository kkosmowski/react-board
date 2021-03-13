import { ReactElement, useContext } from 'react';
import { PostModel } from '@models';
import { Link as RouterLink } from 'react-router-dom';
import { DateFormat } from '@enums';
import { TimeUtil } from '@utils';
import styled from 'styled-components';
import { Button, Card, CardContent } from '@material-ui/core';
import { SessionContext } from '@contexts';

interface PostProps {
  post: PostModel;
}

export function Post({ post }: PostProps): ReactElement {
  const { currentUser } = useContext(SessionContext);
  return (
    <PostCard>
      <PostCardContent>
        <PostDetails>
          <address>
            <RouterLink
              rel="author"
              to={ `/home/users/${ post.created_by.id }` }
            >
              { post.created_by.username }
            </RouterLink>
          </address>
          <time dateTime={ post.created_on }>{ TimeUtil.format(post.created_on, DateFormat.DateWithTime) }</time>
          {
            currentUser.id === post.created_by.id
              ? <Button>Edit</Button>
              : null
          }
        </PostDetails>
        <PostBody>
          { post.body }
        </PostBody>
      </PostCardContent>
    </PostCard>
  );
}

const PostCard = styled(Card)`
  margin-bottom: 16px;
`;

const PostCardContent = styled(CardContent)`
  && {
    padding-left: 24px;
    padding-right: 24px;
  }
`;

const PostDetails = styled.div`
  margin-bottom: 16px;

  address {
    font-style: normal;
  }

  * {
    display: inline;

    :not(:last-child):after {
      content: '|';
      margin: 0 16px;
    }
  }
`;

const PostBody = styled.article`
  margin-left: 16px;
`;