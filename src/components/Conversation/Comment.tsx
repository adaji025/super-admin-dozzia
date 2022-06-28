import React from "react";
import { createStyles, Text, Avatar, Group } from "@mantine/core";
import moment from "moment";

const useStyles = createStyles((theme) => ({
  body: {
    paddingLeft: 54,
    paddingTop: theme.spacing.xs,
    fontWeight: 500,
  },
}));

interface CommentProps {
  postedAt: string;
  body: string;
  author: {
    title: string;
    first_name: string;
    last_name: string;
  };
}

export function Comment({ postedAt, body, author }: CommentProps) {
  const { classes } = useStyles();
  return (
    <div>
      <Group>
        <Avatar radius="xl" color="dark">
          {`${author?.first_name[0]}${author?.last_name[0]}`}
        </Avatar>
        <div>
          <Text
            size="sm"
            style={{ opacity: "0.7", fontSize: "13px", fontWeight: "500" }}
          >{`${author?.title ?? ""} ${author?.first_name} ${
            author?.last_name
          }`}</Text>
          <Text size="xs" color="dimmed">
            {moment(postedAt).format("MMMM Do YYYY, h:mm a")}
          </Text>
        </div>
      </Group>
      <Text className={classes.body} size="sm">
        {body}
      </Text>
    </div>
  );
}
