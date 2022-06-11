import React from "react";
import { createStyles, Text, Avatar, Group } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  body: {
    paddingLeft: 54,
    paddingTop: theme.spacing.xs,
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
        <Avatar radius="xl">
          {`${author?.first_name[0]}${author?.last_name[0]}`}
        </Avatar>
        <div>
          <Text size="sm">{`${author?.title ?? ""} ${author?.first_name} ${
            author?.last_name
          }`}</Text>
          <Text size="xs" color="dimmed">
            {postedAt}
          </Text>
        </div>
      </Group>
      <Text className={classes.body} size="sm">
        {body}
      </Text>
    </div>
  );
}
