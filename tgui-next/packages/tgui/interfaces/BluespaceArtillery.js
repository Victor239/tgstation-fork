import { Fragment } from 'inferno';
import { act } from '../byond';
import { Box, Button, LabeledList, NoticeBox, Section } from '../components';

export const BluespaceArtillery = props => {
  const { state } = props;
  const { config, data } = state;
  const { ref } = config;

  const {
    notice,
    connected,
    unlocked,
    target,
  } = data;

  return (
    <Fragment>
      {!!notice && (
        <NoticeBox>
          {notice}
        </NoticeBox>
      )}
      {connected ? (
        <Fragment>
          <Section
            title="Target"
            buttons={(
              <Button
                icon="crosshairs"
                disabled={!unlocked}
                onClick={() => act(ref, 'recalibrate')} />
            )}>
            <Box
              color={target ? 'average' : 'bad'}
              fontSize="25px">
              {target || 'No Target Set'}
            </Box>
          </Section>
          <Section>
            {unlocked ? (
              <Box style={{ margin: 'auto' }}>
                <Button
                  fluid
                  content="FIRE"
                  color="bad"
                  disabled={!target}
                  fontSize="30px"
                  textAlign="center"
                  lineHeight="46px"
                  onClick={() => act(ref, 'fire')} />
              </Box>
            ) : (
              <Fragment>
                <Box
                  color="bad"
                  fontSize="18px">
                  Bluespace artillery is currently locked.
                </Box>
                <Box mt={1}>
                  Awaiting authorization via keycard reader from at minimum
                  two station heads.
                </Box>
              </Fragment>
            )}
          </Section>
        </Fragment>
      ) : (
        <Section>
          <LabeledList>
            <LabeledList.Item label="Maintenance">
              <Button
                icon="wrench"
                content="Complete Deployment"
                onClick={() => act(ref, 'build')} />
            </LabeledList.Item>
          </LabeledList>
        </Section>
      )}
    </Fragment>
  );
};
