import { ReactElement, useContext, useEffect, useState } from 'react';
import { DataContext } from '@contexts';
import { useHistory, useParams } from 'react-router-dom';
import { PostModel } from '@models';
import { Post } from './Post';
import { Button, Typography } from '@material-ui/core';
import './Thread.scss';
import { ThreadReply } from './ThreadReply';
import { MainStore, SessionState } from '@store/interfaces';
import { ThreadRouteParams } from '@interfaces';
import { BackButton } from '@main';
import { bindActionCreators, Dispatch } from 'redux';
import * as sessionActions from '../../store/actions/session.actions';
import { connect } from 'react-redux';

interface MergedProps extends SessionState {
  actions: any;
}

type ThreadComponentProps = Pick<MergedProps, 'logged' | 'currentUser' | 'actions'>;

function ThreadComponent({ logged, currentUser }: ThreadComponentProps): ReactElement {
  const history = useHistory();
  const { threadId } = useParams<ThreadRouteParams>();
  const {
    addReply,
    clearThread,
    mainElement,
    posts,
    thread,
    getThread,
  } = useContext(DataContext);
  const [postCollection, setPostCollection] = useState<ReactElement[]>([]);
  const [replyVisible, setReplyVisible] = useState(false);
  const [threadScrollable, setThreadScrollable] = useState(false);

  useEffect(() => {
    if (threadId) {
      getThread(parseInt(threadId));
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

  useEffect(() => clearThread, []);

  return (
    <>
      <BackButton />
      <div className="thread root-container">
        <header className="thread__header">
          <hgroup className="thread__details">
            <Typography variant="h4" component="h4">Thread: { thread.name }</Typography>
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

const mapStateToProps = ({ session }: MainStore) => ({
  logged: session.logged,
  currentUser: session.currentUser,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(sessionActions, dispatch),
});

const Thread = connect(mapStateToProps, mapDispatchToProps)(ThreadComponent);

export { Thread };
