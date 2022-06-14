import { ForbiddenError } from "apollo-server-express";

export class FeedError {
  /** 피드를 찾을 수 없습니다. */
  public readonly Feed001 = new ForbiddenError("피드를 찾을 수 없습니다.");
}
