import { Injectable } from '@angular/core';
import { merge } from 'rxjs';
import { CarouselService } from './carousel.service';
import { tap } from 'rxjs/operators';
export class AutoHeightService {
    constructor(carouselService) {
        this.carouselService = carouselService;
        this.spyDataStreams();
    }
    ngOnDestroy() {
        this.autoHeightSubscription.unsubscribe();
    }
    /**
     * Defines Observables which service must observe
     */
    spyDataStreams() {
        const initializedCarousel$ = this.carouselService.getInitializedState().pipe(tap(data => {
            if (this.carouselService.settings.autoHeight) {
                this.update();
            }
            else {
                this.carouselService.slidesData.forEach(slide => slide.heightState = 'full');
            }
        }));
        const changedSettings$ = this.carouselService.getChangedState().pipe(tap(data => {
            if (this.carouselService.settings.autoHeight && data.property.name === 'position') {
                this.update();
            }
        }));
        const refreshedCarousel$ = this.carouselService.getRefreshedState().pipe(tap(data => {
            if (this.carouselService.settings.autoHeight) {
                this.update();
            }
        }));
        const autoHeight$ = merge(initializedCarousel$, changedSettings$, refreshedCarousel$);
        this.autoHeightSubscription = autoHeight$.subscribe(() => { });
    }
    /**
     * Updates the prop 'heightState' of slides
     */
    update() {
        const items = this.carouselService.settings.items;
        let start = this.carouselService.current(), end = start + items;
        if (this.carouselService.settings.center) {
            start = items % 2 === 1 ? start - (items - 1) / 2 : start - items / 2;
            end = items % 2 === 1 ? start + items : start + items + 1;
        }
        this.carouselService.slidesData.forEach((slide, i) => {
            slide.heightState = (i >= start && i < end) ? 'full' : 'nulled';
        });
    }
}
AutoHeightService.decorators = [
    { type: Injectable }
];
AutoHeightService.ctorParameters = () => [
    { type: CarouselService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2hlaWdodC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGlicy9uZ3gtb3dsLWNhcm91c2VsLW8vc3JjL2xpYi9zZXJ2aWNlcy9hdXRvaGVpZ2h0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUN0RCxPQUFPLEVBQTRCLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDckQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR3JDLE1BQU0sT0FBTyxpQkFBaUI7SUFLNUIsWUFBb0IsZUFBZ0M7UUFBaEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2xELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUM1QyxDQUFDO0lBQ0Q7O09BRUc7SUFDSCxjQUFjO1FBQ1osTUFBTSxvQkFBb0IsR0FBdUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLElBQUksQ0FDOUYsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ1QsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUU7Z0JBQzVDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUNmO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLENBQUM7YUFDOUU7UUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFDO1FBRUYsTUFBTSxnQkFBZ0IsR0FBb0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxJQUFJLENBQ25GLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNULElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFLLFVBQVUsRUFBQztnQkFDckYsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQ2Q7UUFDQyxDQUFDLENBQUMsQ0FDSCxDQUFDO1FBRUYsTUFBTSxrQkFBa0IsR0FBdUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLElBQUksQ0FDMUYsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ1QsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUU7Z0JBQzVDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUNmO1FBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztRQUVGLE1BQU0sV0FBVyxHQUE2QixLQUFLLENBQUMsb0JBQW9CLEVBQUUsZ0JBQWdCLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUNoSCxJQUFJLENBQUMsc0JBQXNCLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FDakQsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUNULENBQUM7SUFDSixDQUFDO0lBRUQ7O09BRUc7SUFDSCxNQUFNO1FBQ0osTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFBO1FBQ2pELElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLEVBQ3RDLEdBQUcsR0FBRyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBRXhCLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO1lBQ3hDLEtBQUssR0FBRyxLQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDdEUsR0FBRyxHQUFHLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQztTQUMzRDtRQUVELElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNuRCxLQUFLLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO1FBQ2xFLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7O1lBakVGLFVBQVU7OztZQUhGLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgT2JzZXJ2YWJsZSwgbWVyZ2UgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENhcm91c2VsU2VydmljZSB9IGZyb20gJy4vY2Fyb3VzZWwuc2VydmljZSc7XG5pbXBvcnQgeyB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBdXRvSGVpZ2h0U2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveXtcbiAgLyoqXG4gICAqIFN1YnNjcmlvcHRpb24gdG8gbWVyZ2UgT2JzZXJ2YWJsZSAgZnJvbSBDYXJvdXNlbFNlcnZpY2VcbiAgICovXG4gIGF1dG9IZWlnaHRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjYXJvdXNlbFNlcnZpY2U6IENhcm91c2VsU2VydmljZSkge1xuICAgIHRoaXMuc3B5RGF0YVN0cmVhbXMoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuYXV0b0hlaWdodFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG4gIC8qKlxuICAgKiBEZWZpbmVzIE9ic2VydmFibGVzIHdoaWNoIHNlcnZpY2UgbXVzdCBvYnNlcnZlXG4gICAqL1xuICBzcHlEYXRhU3RyZWFtcygpIHtcbiAgICBjb25zdCBpbml0aWFsaXplZENhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0SW5pdGlhbGl6ZWRTdGF0ZSgpLnBpcGUoXG4gICAgICB0YXAoZGF0YSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5hdXRvSGVpZ2h0KSB7XG4gICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmNhcm91c2VsU2VydmljZS5zbGlkZXNEYXRhLmZvckVhY2goc2xpZGUgPT4gc2xpZGUuaGVpZ2h0U3RhdGUgPSAnZnVsbCcpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG5cbiAgICBjb25zdCBjaGFuZ2VkU2V0dGluZ3MkOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRDaGFuZ2VkU3RhdGUoKS5waXBlKFxuICAgICAgdGFwKGRhdGEgPT4ge1xuICAgICAgICBpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYXV0b0hlaWdodCAmJiBkYXRhLnByb3BlcnR5Lm5hbWUgPT09ICdwb3NpdGlvbicpe1xuXHRcdFx0XHRcdHRoaXMudXBkYXRlKCk7XG5cdFx0XHRcdH1cbiAgICAgIH0pXG4gICAgKTtcblxuICAgIGNvbnN0IHJlZnJlc2hlZENhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0UmVmcmVzaGVkU3RhdGUoKS5waXBlKFxuICAgICAgdGFwKGRhdGEgPT4ge1xuICAgICAgICBpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYXV0b0hlaWdodCkge1xuICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcblxuICAgIGNvbnN0IGF1dG9IZWlnaHQkOiBPYnNlcnZhYmxlPHN0cmluZyB8IGFueT4gPSBtZXJnZShpbml0aWFsaXplZENhcm91c2VsJCwgY2hhbmdlZFNldHRpbmdzJCwgcmVmcmVzaGVkQ2Fyb3VzZWwkKTtcbiAgICB0aGlzLmF1dG9IZWlnaHRTdWJzY3JpcHRpb24gPSBhdXRvSGVpZ2h0JC5zdWJzY3JpYmUoXG4gICAgICAoKSA9PiB7fVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgcHJvcCAnaGVpZ2h0U3RhdGUnIG9mIHNsaWRlc1xuICAgKi9cbiAgdXBkYXRlKCkge1xuICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuaXRlbXNcbiAgICBsZXQgc3RhcnQgPSB0aGlzLmNhcm91c2VsU2VydmljZS5jdXJyZW50KCksXG4gICAgICAgIGVuZCA9IHN0YXJ0ICsgaXRlbXM7XG5cbiAgICBpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuY2VudGVyKSB7XG4gICAgICBzdGFydCA9IGl0ZW1zICUgMiA9PT0gMSA/IHN0YXJ0IC0gKGl0ZW1zIC0gMSkgLyAyIDogc3RhcnQgLSBpdGVtcyAvIDI7XG4gICAgICBlbmQgPSBpdGVtcyAlIDIgPT09IDEgPyBzdGFydCArIGl0ZW1zIDogc3RhcnQgKyBpdGVtcyArIDE7XG4gICAgfVxuXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2xpZGVzRGF0YS5mb3JFYWNoKChzbGlkZSwgaSkgPT4ge1xuICAgICAgc2xpZGUuaGVpZ2h0U3RhdGUgPSAoaSA+PSBzdGFydCAmJiBpIDwgZW5kKSA/ICdmdWxsJyA6ICdudWxsZWQnO1xuICAgIH0pO1xuICB9XG5cblxufVxuIl19