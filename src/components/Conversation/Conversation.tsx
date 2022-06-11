import { useEffect, useState } from "react";
import {
  LoadingOverlay,
  Textarea,
  Group,
  Button,
  ScrollArea,
} from "@mantine/core";
import useConversation from "../../hooks/useConversation";
import { Comment } from "./Comment";
import useTheme from "../../hooks/useTheme";
import "./conversation.scss";

const Conversation = ({
  id,
  onCancel,
  disable,
}: {
  id: string;
  onCancel: () => void;
  disable: boolean;
}) => {
  const { handleGetConversation, loading, setLoading, handlePostConversation } =
    useConversation(id);
  const [conversation, setConversation] = useState<any>(null);
  const [textInput, setTextInput] = useState<string>("");
  const { dark } = useTheme();

  useEffect(() => {
    getConversationList();
    //eslint-disable-next-line
  }, []);

  const getConversationList = () => {
    handleGetConversation().then((res) => {
      setConversation(res);
      setLoading(false);
    });
  };

  const sendReply = () => {
    handlePostConversation(textInput).then(() => {
      setTextInput("");
      getConversationList();
    });
  };

  return (
    <div className="conversation-container">
      <LoadingOverlay visible={loading} />

      <ScrollArea className="c-main">
        {conversation &&
          conversation?.data.map(
            (item: {
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
          variant="filled"
          disabled={disable}
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
