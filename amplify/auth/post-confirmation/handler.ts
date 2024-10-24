import { env } from '$amplify/env/post-confirmation';
import {
    AdminAddUserToGroupCommand,
    CognitoIdentityProviderClient
} from '@aws-sdk/client-cognito-identity-provider';
import type { PostConfirmationTriggerHandler } from 'aws-lambda';

const client = new CognitoIdentityProviderClient();

// add user to group
export const handler: PostConfirmationTriggerHandler = async (event) => {
  const command = new AdminAddUserToGroupCommand({
    GroupName: env.GROUP_NAME,
    Username: event.userName,
    UserPoolId: event.userPoolId
  });
  const response = await client.send(command);
  console.log('processed', response.$metadata.requestId);
  return event;
};