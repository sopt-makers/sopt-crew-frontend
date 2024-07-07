import { api } from '..';

export interface PostCommentWithMentionRequest {
  userIds: number[] | null;
  content: string;
  postId: number;
}

export const postCommentWithMention = async (body: PostCommentWithMentionRequest): Promise<{ statusCode: number }> => {
  return (await api.post<{ statusCode: number }>(`/comment/v2/mention`, body)).data;
};
