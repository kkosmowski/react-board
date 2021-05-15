import { ReactElement, useContext, useEffect, useState } from 'react';
import { DataContext } from '@contexts';
import { useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom';
import { PostModel } from '@models';
import { Post } from './Post';
import { Button, Typography } from '@material-ui/core';
import './Thread.scss';
import { ThreadReply } from './ThreadReply';
import { MainStore, SessionState, ThreadState } from '@store/interfaces';
import { ThreadRouteParams } from '@interfaces';
import { BackButton } from '@main';
import { bindActionCreators, Dispatch } from 'redux';
import * as threadActions from '../../store/actions/thread.actions';
import { connect } from 'react-redux';
import { BreadcrumbsService } from '@services';

interface MergedProps extends SessionState, ThreadState {
  threadActions: any;
}

type ThreadComponentProps = Pick<MergedProps, 'logged' | 'currentUser' | 'thread' | 'posts' | 'threadActions'>;

function ThreadComponent({ logged, currentUser, thread, posts, threadActions }: ThreadComponentProps): ReactElement {
  const history = useHistory();
  const location = useLocation();
  const { threadId } = useParams<ThreadRouteParams>();
  const { addReply, mainElement } = useContext(DataContext);
  const [postCollection, setPostCollection] = useState<ReactElement[]>([]);
  const [replyVisible, setReplyVisible] = useState(false);
  const [threadScrollable, setThreadScrollable] = useState(false);

  useEffect(() => {
    BreadcrumbsService.setBreadcrumbs(location.pathname);
  }, [thread]);

  useEffect(() => {
    if (threadId) {
      threadActions.getThread(threadId);
    }
  }, [threadId]);

  useEffect(() => {
    if (currentUser) {
      const collection: ReactElement[] = [];

      posts.forEach((post: PostModel, i: number) => {
        collection.push(
          <Post post={ post } currentUser={ currentUser } key={ i } />
        );
      });

      setPostCollection(collection);
      if (mainElement && mainElement.current) {
        setTimeout(() => {
          setThreadScrollable(mainElement.current.scrollHeight > window.innerHeight);
        }, 0);
      }
    }
  }, [currentUser, posts]);

  const handleReplyClick = () => {
    if (logged) {
      setReplyVisible(true);
      if (mainElement && mainElement.current) {
        setTimeout(() => {
          mainElement.current.scrollTo(0, mainElement.current.scrollHeight);
        }, 0);
      }
    } else {
      history.push('/auth/login');
    }
  };

  // TODO: Add post edit if created_by.id === currentUser.id
  const createReplyButton = (): ReactElement => (
    <div>
      <Button
        type="button"
        title="Reply"
        color="secondary"
        variant="contained"
        onClick={ handleReplyClick }
      >
        Reply
      </Button>
    </div>
  );

  useEffect(() => threadActions.clearThread, []);

  return (
    <>
      <BackButton />
      <div className="thread root-container">
        <header className="thread__header">
          <hgroup className="thread__details">
            <Typography variant="h4" component="h4">Thread: { thread?.name }</Typography>
          </hgroup>
          <hgroup className="thread__controls">
            { createReplyButton() }
          </hgroup>
        </header>
        { postCollection }
        { replyVisible
          ? <ThreadReply onAddReply={ addReply } logged={ logged } />
          : threadScrollable
            ? createReplyButton()
            : null
        }
      </div>
    </>
  );
}

const mapStateToProps = ({ category, session, thread }: MainStore) => ({
  logged: session.logged,
  currentUser: session.currentUser,
  thread: thread.thread,
  posts: thread.posts,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  threadActions: bindActionCreators(threadActions, dispatch),
});

const Thread = connect(mapStateToProps, mapDispatchToProps)(ThreadComponent);

export { Thread };
