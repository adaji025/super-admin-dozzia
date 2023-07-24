import { useEffect, useState, useRef } from "react";
import {
  LoadingOverlay,
  Textarea,
  Group,
  Button,
  ScrollArea,
} from "@mantine/core";
import { Comment } from "./Comment";
import useTheme from "../../hooks/useTheme";
import "./conversation.scss";

const Conversation = ({
  onCancel,
  disable,
  handleGetConversation,
  loading,
  setLoading,
  handlePostConversation,
}: any) => {
  const [conversation, setConversation] = useState<any>(null);
  const [textInput, setTextInput] = useState<string>("");
  const { dark } = useTheme();
  const viewport = useRef<any>();

  useEffect(() => {
    getConversationList();
    //eslint-disable-next-line
  }, []);

  const getConversationList = () => {
    handleGetConversation().then((res: any) => {
      setConversation(res);
      setTextInput("");
      setTimeout(() => {
        viewport.current.scrollTo({
          top: viewport.current.scrollHeight,
          behavior: "smooth",
        });
      }, 500);
      setLoading(false);
    });
  };

  const sendReply = () => {
    handlePostConversation(textInput).then(() => {
      getConversationList();
    });
  };

  return (
    <div className="conversation-container">
      <LoadingOverlay visible={loading} />

      <ScrollArea className="c-main" viewportRef={viewport}>
        {conversation &&
          conversation?.data.map(
            (item: {
              id: string;
              body: string;
              date: string;
              sender: {
                title: string;
                first_name: string;
                last_name: string;
              };
            }) => (
              <div
                className="comment-wrapper"
                style={{
                  borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
                }}
                key={item?.id}
              >
                <Comment
                  postedAt={item?.date}
                  author={item?.sender}
                  body={item?.body}
                />
              </div>
            )
          )}
      </ScrollArea>

      <div className="c-input">
        <Textarea
          label="Send response"
          value={textInput}
          onChange={(e: any) => {
            setTextInput(e.target.value);
          }}
          disabled={disable}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendReply();
            }
          }}
        />
        <Group position="right" mt="lg">
          <Button variant="default" onClick={onCancel}>
            Go back
          </Button>

          <Button onClick={sendReply} disabled={textInput === ""}>
            Post reply
          </Button>
        </Group>
      </div>
    </div>
  );
};

export default Conversation;
