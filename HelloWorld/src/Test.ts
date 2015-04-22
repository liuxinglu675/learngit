
module egret {

	export class Test extends DisplayObjectContainer {
		
		
		public constructor() {
			super();
			this.addEvent();
		}
		
		public addEvent(){
			this.addEventListener(TouchEvent.TOUCH_TAP, this.clickHandler, this);
			this.addEventListener(Event.ADDED_TO_STAGE, this.addToSHandler, this);
			this.addEventListener(Event.REMOVED_FROM_STAGE, this.removeFromSHandler, this);
		}
		
		public removeEvent(){
			this.removeEventListener(TouchEvent.TOUCH_TAP, this.clickHandler, this);
			this.removeEventListener(Event.ADDED_TO_STAGE, this.addToSHandler, this);
			this.removeEventListener(Event.REMOVED_FROM_STAGE, this.removeFromSHandler, this);
		}
		
		public clickHandler(e:TouchEvent){
			
		}
		
		public addToSHandler(e:Event){
		}
		
		public removeFromSHandler(e:Event){
			this.removeEvent();
		}
	}
}