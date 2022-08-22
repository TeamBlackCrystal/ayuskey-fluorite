import { FC, MouseEventHandler, useState } from "react";
import { Avatar, Row, Col, Text, Button, Spacer, Grid, AvatarProps as TAvatarProps, CSS } from "@nextui-org/react";
import { NoteUser } from "@ayuskey/misskey.js/built/entities";
import { useAyuskeyClient } from "../hooks/useAyuskeyClient";
import { useQuery } from "react-query";

interface Props {
  avatarProps?: TAvatarProps,
  css?: CSS,
  onPress?: MouseEventHandler<unknown>,
  props?: any,
  user: NoteUser
}

export const UserTwitterCard: FC<Props> = ({avatarProps, css, onPress, props, user}) => {
  const [following, setFollowing] = useState(false);
  const api = useAyuskeyClient()
  const {data, isLoading} = useQuery(`${user.id}Profile`, () => api.request("users/show", {userId: user.id}))



  return (
    <Grid.Container
      className="user-twitter-card__container"
      css={{
        mw: "250px",
        borderRadius: "$lg",
        padding: "$sm",
        ...css,
      }}
      onPress={onPress}
      {...props}
    >
      <Row justify="space-between" align="center">
        <Col span={3}>
          <Avatar
            size="lg"
            src={user.avatarUrl}
            color="gradient"
            bordered
            squared
            {...avatarProps}
          />
        </Col>
        <Col span={9}>
          <Row>
            <Grid xs={12} direction="column">
              <Text className="user-twitter-card__text" b size={15}>
                {user.name ? user.name : user.username}
              </Text>
              <Text
                className="user-twitter-card__text"
                size={14}
                css={{ mt: "-$3" }}
                color="#888888"
              >
                @{user.username}{user.instance && <>@{user.instance.host}</>}
              </Text>
            </Grid>
            <Button
              auto
              rounded
              onPress={() => setFollowing(!following)}
              css={{
                maxHeight: "$space$12",
                fs: "$xs",
                fontWeight: "$semibold",
                borderColor: following ? "$foreground" : "$primary",
                color: following ? "$foreground" : "$white",
              }}
              color="primary"
              bordered={following}
            >
              {following ? "Unfollow" : "Follow"}
            </Button>
          </Row>
        </Col>
      </Row>
      <Grid.Container className="user-twitter-card__username-container">
        <Grid xs={12}>
          <Text
            className="user-twitter-card__text"
            size={14}
            css={{ mt: "$1" }}
            color="#888888"
          >
            {!isLoading && data && data.description}
          </Text>
        </Grid>
      </Grid.Container>

      <Grid.Container
        className="user-twitter-card__metrics-container"
        justify="flex-start"
        alignContent="center"
      >
        <Text className="user-twitter-card__text" size={14} color="#888888">
          <Text
            b
            color="foreground"
            className="user-twitter-card__text"
            size={14}
            css={{ mr: "$1" }}
          >
            4
          </Text>
          フォロー
        </Text>
        <Spacer inline x={0.5} />
        <Text className="user-twitter-card__text" size={14} color="#888888">
          <Text
            b
            color="foreground"
            className="user-twitter-card__text"
            size={14}
            css={{ mr: "$1" }}
          >
            97.1K
          </Text>
          フォロワー
        </Text>
      </Grid.Container>
    </Grid.Container>
  );
};
