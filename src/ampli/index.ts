/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/**
 * Ampli - A strong typed wrapper for your Analytics
 *
 * This file is generated by Amplitude.
 * To update run 'ampli pull web'
 *
 * Required dependencies: @amplitude/analytics-browser@^1.3.0
 * Tracking Plan Version: 2
 * Build: 1.0.0
 * Runtime: browser:typescript-ampli-v2
 *
 * [View Tracking Plan](https://data.amplitude.com/sopt-makers/sopt-makers-crew/events/main/latest)
 *
 * [Full Setup Instructions](https://data.amplitude.com/sopt-makers/sopt-makers-crew/implementation/web)
 */

import * as amplitude from '@amplitude/analytics-browser';

export type Environment = 'default';

export const ApiKey: Record<Environment, string> = {
  default: '94650b2a33ffa5e8cc81b4ec3880730d'
};

/**
 * Default Amplitude configuration options. Contains tracking plan information.
 */
export const DefaultConfiguration: BrowserOptions = {
  plan: {
    version: '2',
    branch: 'main',
    source: 'web',
    versionId: 'e51ec5e2-7e99-4072-b0f6-530f6c5a6e9d'
  },
  ...{
    ingestionMetadata: {
      sourceName: 'browser-typescript-ampli',
      sourceVersion: '2.0.0'
    }
  }
};

export interface LoadOptionsBase { disabled?: boolean }

export type LoadOptionsWithEnvironment = LoadOptionsBase & { environment: Environment; client?: { configuration?: BrowserOptions; }; };
export type LoadOptionsWithApiKey = LoadOptionsBase & { client: { apiKey: string; configuration?: BrowserOptions; } };
export type LoadOptionsWithClientInstance = LoadOptionsBase & { client: { instance: BrowserClient; } };

export type LoadOptions = LoadOptionsWithEnvironment | LoadOptionsWithApiKey | LoadOptionsWithClientInstance;

export interface IdentifyProperties {
  /**
   * 유저의 알림 허용 여부
   */
  alarm_enabled?: boolean;
  /**
   * 유저의 최초 피드 댓글 작성 일자
   */
  first_feed_comment_date?: any;
  /**
   * 유저의 최초 피드 작성 일자
   */
  first_feed_posting_date?: any;
  /**
   * 유저의 최근 피드 댓글 작성 일자
   */
  last_feed_comment_date?: any;
  /**
   * 유저의 최근 피드 작성 일자
   */
  last_feed_posting_date?: any;
  /**
   * 유저의 최근 모임 상세 뷰 조회 일자
   */
  last_group_detail_session_date?: any;
  /**
   * 유저가 피드에 작성한 댓글의 개수
   */
  total_feed_comment?: string;
  /**
   * 유저가 포스팅한 피드의 개수
   *
   * | Rule | Value |
   * |---|---|
   * | Type | integer |
   */
  total_feed_posting?: number;
  /**
   * 유저가 소속된 모임의 개수 (개설 + 신청)
   *
   * | Rule | Value |
   * |---|---|
   * | Type | integer |
   */
  total_group?: number;
  /**
   * 유저가 개설한 모임의 개수
   *
   * | Rule | Value |
   * |---|---|
   * | Type | integer |
   */
  total_group_create?: number;
  /**
   * 유저가 신청 완료 후 승인된 모임의 개수
   *
   * | Rule | Value |
   * |---|---|
   * | Type | integer |
   */
  total_group_join?: number;
  /**
   * 유저의 고유 아이디 정보
   */
  user_id?: string;
}

export interface ClickNavbarGroupProperties {
  /**
   * 모임 서비스 내의 탭 영역 메뉴명을 의미합니다.
   */
  menu: string;
}

export class Identify implements BaseEvent {
  event_type = amplitude.Types.SpecialEventType.IDENTIFY;

  constructor(
    public event_properties?: IdentifyProperties,
  ) {
    this.event_properties = event_properties;
  }
}

export class ClickNavbarGroup implements BaseEvent {
  event_type = 'Click-navbarGroup';

  constructor(
    public event_properties: ClickNavbarGroupProperties,
  ) {
    this.event_properties = event_properties;
  }
}

export type PromiseResult<T> = { promise: Promise<T | void> };

const getVoidPromiseResult = () => ({ promise: Promise.resolve() });

// prettier-ignore
export class Ampli {
  private disabled: boolean = false;
  private amplitude?: BrowserClient;

  get client(): BrowserClient {
    this.isInitializedAndEnabled();
    return this.amplitude!;
  }

  get isLoaded(): boolean {
    return this.amplitude != null;
  }

  private isInitializedAndEnabled(): boolean {
    if (!this.amplitude) {
      console.error('ERROR: Ampli is not yet initialized. Have you called ampli.load() on app start?');
      return false;
    }
    return !this.disabled;
  }

  /**
   * Initialize the Ampli SDK. Call once when your application starts.
   *
   * @param options Configuration options to initialize the Ampli SDK with.
   */
  load(options: LoadOptions): PromiseResult<void> {
    this.disabled = options.disabled ?? false;

    if (this.amplitude) {
      console.warn('WARNING: Ampli is already intialized. Ampli.load() should be called once at application startup.');
      return getVoidPromiseResult();
    }

    let apiKey: string | null = null;
    if (options.client && 'apiKey' in options.client) {
      apiKey = options.client.apiKey;
    } else if ('environment' in options) {
      apiKey = ApiKey[options.environment];
    }

    if (options.client && 'instance' in options.client) {
      this.amplitude = options.client.instance;
    } else if (apiKey) {
      this.amplitude = amplitude.createInstance();
      const configuration = (options.client && 'configuration' in options.client) ? options.client.configuration : {};
      return this.amplitude.init(apiKey, undefined, { ...DefaultConfiguration, ...configuration });
    } else {
      console.error("ERROR: ampli.load() requires 'environment', 'client.apiKey', or 'client.instance'");
    }

    return getVoidPromiseResult();
  }

  /**
   * Identify a user and set user properties.
   *
   * @param userId The user's id.
   * @param properties The user properties.
   * @param options Optional event options.
   */
  identify(
    userId: string | undefined,
    properties?: IdentifyProperties,
    options?: EventOptions,
  ): PromiseResult<Result> {
    if (!this.isInitializedAndEnabled()) {
      return getVoidPromiseResult();
    }

    if (userId) {
      options = {...options,  user_id: userId};
    }

    const amplitudeIdentify = new amplitude.Identify();
    const eventProperties = properties;
    if (eventProperties != null) {
      for (const [key, value] of Object.entries(eventProperties)) {
        amplitudeIdentify.set(key, value);
      }
    }
    return this.amplitude!.identify(
      amplitudeIdentify,
      options,
    );
  }

 /**
  * Flush the event.
  */
  flush() : PromiseResult<Result> {
    if (!this.isInitializedAndEnabled()) {
      return getVoidPromiseResult();
    }

    return this.amplitude!.flush();
  }

  /**
   * Track event
   *
   * @param event The event to track.
   * @param options Optional event options.
   */
  track(event: Event, options?: EventOptions): PromiseResult<Result> {
    if (!this.isInitializedAndEnabled()) {
      return getVoidPromiseResult();
    }

    return this.amplitude!.track(event, undefined, options);
  }

  /**
   * Click-navbarGroup
   *
   * [View in Tracking Plan](https://data.amplitude.com/sopt-makers/sopt-makers-crew/events/main/latest/Click-navbarGroup)
   *
   * \[전체 모임\] \[내 모임\] 메뉴 버튼 클릭
   *
   * @param properties The event's properties (e.g. menu)
   * @param options Amplitude event options.
   */
  clickNavbarGroup(
    properties: ClickNavbarGroupProperties,
    options?: EventOptions,
  ) {
    return this.track(new ClickNavbarGroup(properties), options);
  }
}

export const ampli = new Ampli();

// BASE TYPES
type BrowserOptions = amplitude.Types.BrowserOptions;

export type BrowserClient = amplitude.Types.BrowserClient;
export type BaseEvent = amplitude.Types.BaseEvent;
export type IdentifyEvent = amplitude.Types.IdentifyEvent;
export type GroupEvent = amplitude.Types.GroupIdentifyEvent;
export type Event = amplitude.Types.Event;
export type EventOptions = amplitude.Types.EventOptions;
export type Result = amplitude.Types.Result;
