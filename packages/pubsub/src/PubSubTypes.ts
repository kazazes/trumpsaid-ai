import { VideoUpload, VideoUploadStorageLinkCreateInput } from '@trumpsaid/prisma';

export interface IVideoDownloadResponseMessage extends IPubSubConsumerSuccessMessage {
  videoUpload: VideoUpload;
  storageLinkCreateInputs: VideoUploadStorageLinkCreateInput[];
}
export interface IVideoDownloadFailedMessage extends IPubSubConsumerFailedResponse {
  requestPayload: VideoUpload;
}

export interface IVideoRenderSuccessMessage extends IPubSubConsumerSuccessMessage {
  videoUpload: VideoUpload;
  storageLinkCreateInputs: VideoUploadStorageLinkCreateInput[];
}

export interface IVideoRenderFailedMessage extends IPubSubConsumerFailedResponse {
  requestPayload: VideoUpload;
}

export interface ITopicSubscriptionNames {
  consumerTopicName: string;
  consumerSubscriptionName: string;
  responderTopicName: string;
  responderSubscriptionName: string;
}

export interface IPubSubConsumerFailedResponse {
  requestPayload: any;
  error: any;
}

// tslint:disable-next-line:no-empty-interface
export interface IPubSubConsumerSuccessMessage {

}

// tslint:disable-next-line:no-empty-interface
export interface IPubSubConsumerUpdateMessage {}

export interface IPubSubConsumerPayload {
  ack?(): void;
  nack?(): void;
}

export interface IThumbnailRequest extends IPubSubConsumerPayload {
  upload: VideoUpload;
  timestamp: number;
}

export interface IThumbnailResponseMessage extends IPubSubConsumerSuccessMessage {
  videoUpload: VideoUpload;
  storageLinkCreateInputs: VideoUploadStorageLinkCreateInput[];
}

export interface IThumbnailFailedMessage extends IPubSubConsumerFailedResponse {
  requestPayload: VideoUpload;
  timestamp: number;
}
