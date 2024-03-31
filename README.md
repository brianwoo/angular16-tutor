# NOTES

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.12.

Course: [Learn Angular A-Z: Complete Tutorial for Beginners](https://www.youtube.com/watch?v=JWhRMyyF7nc)

---



## *ngFor
## *ngIf
## ng-template

## Binding
### Property Binding
- Components's property --> Element's property
- Use square brackets []

```typescript
// Component
imageUrl = "http://image.site/taylor.jpg"
```
```html
<!-- Html template -->
<img alt="xxx", [src]="imageUrl">
```

### Attribute Binding
- Component's property --> Element's attribute
- Use square brackets and attr [attr.xxxx]

```typescript
// Component
actionName = "Click me"
```
```html
<!-- Html template -->
<button type="button" [attr.aria-label]="actionName">
    {{actionName}}
</button>
```

### Event Binding
- Element's event --> Component's event handler
- Use Parentheses ()

```typescript
// Component
clickHandler(e: MouseEvent) {
    console.log("...clicked...")
}
```

```html
<!-- Html template -->
<button type="button" (click)="clickHandler($event)">
```

### NgModel - 2-way Binding
- Create a 2-way binding between Component and Element
- Use [(ngModel)]
- The input value is sent to a variable in the component, which causes it to change and update the view.
- Need to add FormsModule to imports

```typescript
// app.module.ts
imports: [ FormsModule ]
```

```typescript
// Component
newWishText = ""
```

```html
<!-- Html template -->
<input type="text" [(ngModel)]="newWishText"><span>{{newWishText}}</span>
```

### ngModelChange
- 1 way binding

```typescript
// component
filterChanged(value: any) {
  console.log(value);
}
```

```html
<!-- Html template -->
<select name="list-filter" 
    [(ngModel)]="xxx" 
    (ngModelChange)="filterChanged($event)">
```


## Using a Getter Method vs a Variable
- Using a Getter method can offer a way to getting an updated value
- Using a variable returns a static value

```typescript
// variable
visibleItems: WishItem[] = this.items;
```


```typescript
// Using a getter method to make sure an updated list is returned everytime visibleItems is referenced
get visibleItems(): WishItem[] {

    let value = this.listFilter;
    if (value === '0') {
        return this.items;
    }
    else if (value === '1') {
        return this.items.filter((item) => !item.isComplete)
    }
    else {
        return this.items.filter((item) => item.isComplete)
    }
}
```

```html
<!-- HTML template -->
<div>{{visibleItems}}</div>
```

## @Input()
- Input is used in a child component which receives a variable from the parent
- VIEW --- *updates* ---> MODEL
- Like parent passing data as a React Prop
- SYNTAX: [receiving_component_variable]="parent_variable"

```html
<!-- Parent HTML template -->
<!-- visibleItems is a getter method in the Parent Component -->
<wish-list [wishes]="visibleItems" />
```

```html
<!-- wish-list (Child, receiving) HTML template -->
<div *ngIf="wishes.length === 0; else showItems">
    There are no wishes to display.
</div>
```

```typescript
// wish-list component (Child)
@Component({
  selector: 'wish-list',
  ...
})
@Input() wishes: WishItem[] = [];
```


## @Output()
- Output is used in a child component which emits data (as an $event) to the parent
- MODEL --- *updates* ---> VIEW
- We need 2 things for emitting an output value:
    - The EventEmitter in the Output()
    - emit() function to do the emission
- SYNTAX: (child's_component_emitter)="parent's component / emitter's $event value"

```html
<!-- Parent HTML template -->
<!-- addWish is an emitter in the AddWishFormComponent -->
<app-add-wish-form (addWish)="items.push($event)" />
```

```html
<!-- Child HTML template -->
<button class="btn btn-primary" (click)="addNewWish($event)">Add Wish</button>
```

```typescript
// AddWishFormComponent (Child)
@Output() addWish = new EventEmitter<WishItem>();

addNewWish(e: MouseEvent) {
    e.preventDefault();
    this.addWish.emit(new WishItem(this.newWishText));
}
```

## @Input + @Output: 2 way binding
- Combining both @Input and @Output
- MODEL <--- *updates* ---> VIEW
- @Output emitter's name needs to be xxxxChange

```typescript
// Client Component (WishFilter Component)
@Input() filter: any;
@Output() filterChange = new EventEmitter<any>();
```

```html
<!-- Parent HTML template -->
<!-- [(filter)] is 2 way binding on filter / filterChange -->
<app-wish-filter [(filter)]="listFilter" />
<>
```

```typescript
// Parent Component
listFilter = '0';
```

## ngClass
- Binding a CSS class to the HTML template

```css
.strikeout {
    ...
}
```
```html
<label [ngClass]="'strikeout'">
    <label>...</label>
</label>
```

## Rxjs Observable

### Using of()
- of() returns an Observable
- Observable requires subscribe() to get data

```typescript
// products.service.ts

export class ProductsService {

  private data: any[] = [
    { id: 1, name: "Guitar", price: 1000 },
    { id: 2, name: "Piano", price: 5000 },
    { id: 3, name: "Drums", price: 1200 },
  ];

  constructor() { }

  getAllProducts() {
    return of(this.data);
  }
}
```

```typescript
export class ProductsListComponent implements OnInit {

  products: any[] = [];

  // Injecting ProductsService into ProductListComponent
  constructor(private store: ProductsService) { }

  // use .subscribe() to get products
  ngOnInit(): void {
    this.store.getAllProducts().subscribe(products => {
      this.products = products;
    })
  }

}
```



### Event Bus (without Dependency Injection)
- Event Bus is used to avoid passing an event between top and deep nested components (Like avoiding prop drilling in React)

```typescript
import { Observable, Subject } from "rxjs";

// Event Bus as a service, shared by each component
class EventService {

    private subject = new Subject();

    // This method is to emit data (payload) when there is
    // a change.
    emit(eventName: string, payload: any) {
        this.subject.next({ eventName, payload });
    }

    // This method is used by the observer who wants to be notified
    // when there is a change.
    listen(eventName: string, callback: (event: any) => void) {
        this.subject.asObservable().subscribe((nextObj: any) => {
            if (eventName === nextObj.eventName) {
                callback(nextObj.payload);
            }
        });
    }
}

export default new EventService();
```

```typescript
// Subscribe to Observable (e.g. app component, parent)
events.listen('removeWish', (wish: any) => {
    const index = this.items.indexOf(wish);
    this.items.splice(index, 1);
});
```

```typescript
// Observable emits changes (e.g. Wish-Item, child)
removeWish() {
    events.emit('removeWish', this.wish);
}
```

### Event Bus (with Dependency Injection)
- Example with the Observable Event Bus
```typescript
// Option 1: Export and add Injectable to EventService
@Injectable()
export class EventService {
    ...
}

// In app.module.ts:
providers: [EventService],
```
```typescript
// Option 2: Export and add Injectable to EventService with providedIn
@Injectable({
    providedIn: 'root'
})
export class EventService {
    ...
}
```


```typescript
// Inject to the subscriber's constructor
constructor(private events: EventService) {
    ...
}
```

```typescript
// Inject to the Observable's constructor
constructor(private events: EventService) {
    ...
}
```

## HTTP Request
- Angular has a built-in HTTP Client library, which includes:
  - HttpClientModule
  - HttpClient (Injectable)

```typescript
// app.module.ts
import { HttpClientModule } from '@angular/common/http';

imports: [HttpClientModule]
```

```typescript
// ng generate service Wish
// WishService is injectable

@Injectable({
  providedIn: 'root'
})
export class WishService {

  // we inject HttpClient
  constructor(private http: HttpClient) { }

  // this.http.get ONLY returns an Observable
  // to call, we need to call the .subscribe()
  getWishes() {
    return this.http.get('assets/wishes.json');
  }
}
```

```typescript
// app.component.ts

// We inject the wishService
constructor(private wishService: WishService) { }

// Use .subscribe() with a callback function.
ngOnInit(): void {
    this.wishService.getWishes().subscribe((data: any) => {
        this.items = data;
    })
}
```

## HTTP Request Error Handling
- use pipe and catchError
```typescript
import { catchError } from 'rxjs/operators';

getWishes() {
    return this.http
        .get('assets/wishes1.json', options)
        .pipe(catchError(this.handleError));
}

private handleError(error: HttpErrorResponse) {
    // status === 0 means not a server error
    // it's a client or network error 4XX
    if (error.status === 0) {
        console.error('Issue with the client or network:', error.error);
    }
    else { // server side error 5XX
        console.error('Server-side error:', error.error);
    }

    return throwError(() => new Error('Cannot retrieve wishes from server, try again'));
}
```

## Reactive Forms

### FormControl
- For form building

```typescript
// in xxx.module.ts
imports: [
  ReactiveFormsModule,
],
```
```typescript
// xxx.component.ts, create the formControl field
senderNameControl = new FormControl('');

// Can use the dirty property to check if the field was changed.
submitForm() {
    if (this.senderNameControl.dirty) {
        alert('you changed email');
    }
}
```
```html
<!-- xxx.component.html -->

<!-- use the formControl property binding -->
<input type="text" [formControl]="senderNameControl">

<!-- submitForm() -->
<button 
    type="submit" 
    (click)="$event.preventDefault(); submitForm()">
    Send Message
</button>
```

### FormGroup and Validators
- Wraps a collection of form controls
```html
<!-- xxx.component.html -->

<!-- formGroup and ngSubmit -->
<form [formGroup]="contactForm" (ngSubmit)="$event.preventDefault(); submitForm()">

    <!-- each form control within the group, use formControlName -->
    <input type="text" class="form-control" formControlName="senderName">

    <input type="email" class="form-control" formControlName="senderEmail">
    <!-- error message if invalid -->
    <div *ngIf="contactForm.get('senderEmail')?.touched">
        <!-- required is built-in -->
        <small class="text-danger" *ngIf="contactForm.get('senderEmail')?.hasError('required')">
            Please enter an email
        </small>
        <!-- email is built-in -->
        <small class="text-danger" *ngIf="contactForm.get('senderEmail')?.hasError('email')">
            Email is invalid
        </small>
        <!-- invalidDomain is from our custom validator -->
        <small class="text-danger" *ngIf="contactForm.get('senderEmail')?.hasError('invalidDomain')">
            Email is not in the allowed domain
        </small>
    </div>

    
    <textarea class="form-control" rows="3" formControlName="senderMessage"></textarea>

    <button type="submit" class="btn btn-primary">Send Message</button>
</form>
```

```typescript
// xxx.component.ts

// Custom Validator (a ValidatorFn)
// when error ValidationErrors is returned, or null if valid
function invalidEmailDomain(control: AbstractControl): ValidationErrors | null {
  const value = control.value?.toLowerCase();
  const hosts = ['gmail.com', 'yahoo.com'];

  if (!value) {
    return null;
  }

  const matches = hosts.some(host => value.indexOf(`@${host}`) > -1);

  // note: invalidDomain is the key to check in hasError()
  return matches ? { invalidDomain: true } : null;
}


// FormControl with built-in validators, or custom ValidatorFn
contactForm = new FormGroup({
    senderName: new FormControl('', Validators.required),
    senderEmail: new FormControl('', [Validators.required, Validators.email, invalidEmailDomain]),
    senderMessage: new FormControl('', [Validators.required, Validators.minLength(10)]),
});

submitForm() {

    // valid will check for validity
    console.log(this.contactForm.valid);

    // .value will return values from all controls
    console.log(this.contactForm.value);
}
```

## Routing
- To create a project with routing
    - ng new [app-name] --routing

- To add routing to an existing application
    - ng generate module app-routing --flat --module=app
    - AppRoutingModule is then added to app.module.ts
    - Angular.io: [Add the AppRoutingModule](https://angular.io/tutorial/tour-of-heroes/toh-pt5#add-the-approutingmodule)

- ** Every Module that uses routerLink requires RouterModule **


```typescript
// app-routing.module.ts

const routes: Routes = [
  // this is root: /
  { path: '', component: WishComponent },
  { path: 'first', component: RouterDemoFirstComponent },
  { path: 'second', component: RouterDemoSecondComponent },
  { path: 'wish', component: WishComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'products/:id', component: ProductdetailsComponent },
  // default, catch all (needs to be at the end):
  { path: '**', component: NotFoundComponent },
];
```

```html
<!-- app.component.html -->

<!-- using click event to navigate -->
 <a href="#" (click)="$event.preventDefault(); goToContact()">
    Go to Contact (onClick)
</a>

<!-- Routing outlet, this shows the component -->
<router-outlet></router-outlet>
```

```typescript
// app.component.ts

constructor(private router: Router) { }

goToContact() {
    this.router.navigate(['contact']);
}
```

### To call a URL that needs a parameter

```html
<!-- product-list.component.html -->
<a href="#" [routerLink]="['/products', product.id]">{{product.name}}</a>
```

```typescript
// productdetails.component.ts - to get the URL param ID
// use ActivatedRoute

constructor(private store: ProductsService, private route: ActivatedRoute) { }

ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
        const id = params.get('id');

        if (id) {
            this.store
                .getProduct(parseInt(id, 10))
                .subscribe((product) => this.product = product);
        }

    })
}

```


## Lifecycle Hooks

### NgOnInit()
- Method executes on component initialization time
- Component implements OnInit


## Adding a new Module
- ng generate module [module-name]
- e.g. ng generate module wish

```typescript
// In the new module, export the components
...
exports: [
    WishListComponent,
    AddWishFormComponent,
    WishFilterComponent,
    WishListItemComponent
],
```

```typescript
// In app.module.ts, import this new module
...
imports: [
    WishModule,
],
```






## Adding a new Component in a module
- ng generate component [component-name] -m [module]
- e.g. ng generate component wish -m wish


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

ng generate module wish
ng generate component wish-list





<!-- 
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

-->