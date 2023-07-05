import mixpanel from "mixpanel-browser";

export class MixpanelTracking {
  private static _instance: MixpanelTracking;

  public static getInstance(): MixpanelTracking {
    if (MixpanelTracking._instance == null)
      return (MixpanelTracking._instance = new MixpanelTracking());
    return this._instance;
  }

  public constructor() {
    if (MixpanelTracking._instance)
      throw new Error(
        "Error: Instance creation of MixpanelTracking is not allowed. Use Mixpanel.getInstance instead",
      );

    mixpanel.init(`${process.env.NEXT_PUBLIC_MIXPANEL_API_TOKEN}`, {
      debug: true,
      track_pageview: true,
      ignore_dnt: true,
      persistence: "localStorage",
    });
  }

  protected track(name: string, data: object = {}) {
    mixpanel.track(name, data);
  }

  public pageViewed() {
    console.log("Event::pageview");
    this.track("page_viewed");
  }
}
