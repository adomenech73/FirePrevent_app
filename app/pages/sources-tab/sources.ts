import {Page, Platform, Storage, SqlStorage} from 'ionic-angular';
import { FORM_DIRECTIVES, FormBuilder,  ControlGroup, Validators, AbstractControl } from 'angular2/common';


@Page({
  templateUrl: 'build/pages/sources-tab/sources.html',
})
export class PageSources {
	protected pltform: Platform;
	protected storage: Storage;
	protected sources = [];
	protected sourceForm: ControlGroup;
    protected name: AbstractControl;
    protected unit: AbstractControl;
    protected delta: AbstractControl;


	add() {
	    this.pltform.ready().then(() => {
	        // this.storage.query("INSERT INTO sources (name, unit, delta) VALUES ('temp', 'Cº', 0.0)").then((data) => {
			let sql = "INSERT INTO sources (name, unit, delta) VALUES (?,?,?)";
			this.storage.query(sql, [this.name.value, this.unit.value, this.delta.value]).then((data) => {
				//this.refresh(); // Keep list fresh.
			}, (error) => {
	            console.log("ERROR -> " + JSON.stringify(error.err));
	        });
	    });
	}
	
	refresh() {
	    this.pltform.ready().then(() => {
	        this.storage.query("SELECT * FROM sources").then((data) => {
	            this.sources = [];
	            if(data.res.rows.length > 0) {
	                for(var i = 0; i < data.res.rows.length; i++) {
	                    this.sources.push({name: data.res.rows.item(i).name, unit: data.res.rows.item(i).unit, delta: data.res.rows.item(i).delta});
	                }
	            }
	        }, (error) => {
	            console.log("ERROR -> " + JSON.stringify(error.err));
	        });
	    });
	}

	constructor (platform:Platform, fb: FormBuilder) {
		this.pltform = platform;
		//let sources = [];
		this.pltform.ready().then(() => {
			this.storage = new Storage(SqlStorage);
			this.refresh();
			this.sourceForm = fb.group({  
            	'name': ['', Validators.compose([Validators.required, Validators.minLength(4), checkFirstCharacterValidator])],
            	'unit': ['', Validators.compose([Validators.required, Validators.minLength(1), checkFirstCharacterValidator])],
            	'delta': ['', Validators.compose([Validators.required, Validators.minLength(3), checkNumericValidator])]
        	});
        	this.name = this.sourceForm.controls['name'];     
        	this.unit = this.sourceForm.controls['unit'];
        	this.delta = this.sourceForm.controls['delta']; 
		});
	}    
 
    onSubmit(value: string): void { 
        if(this.sourceForm.valid) {
            console.log('Submitted value: ', value);
            this.add();
            this.refresh();

            /*for (var i = 0; i < this.sourceForm.controls.length; i++) {
            	(<Control>this.sourceForm.controls[i]).updateValue("");
            	(<Control>this.sourceForm.controls[i]).markAsUntouched();
            }*/

        	/*(<Control>this.sourceForm.controls['name']).markAsPristine();
        	(<Control>this.sourceForm.controls['unit']).markAsPristine();
        	(<Control>this.sourceForm.controls['delta']).markAsPristine();*/


            (<Control>this.sourceForm.controls['name']).updateValue("");
            (<Control>this.sourceForm.controls['name']).markAsUntouched();
            (<Control>this.sourceForm.controls['unit']).updateValue("");
            (<Control>this.sourceForm.controls['unit']).markAsUntouched();
            (<Control>this.sourceForm.controls['delta']).updateValue("");
            (<Control>this.sourceForm.controls['delta']).markAsUntouched();
        }
    }

    function checkFirstCharacterValidator(control: Control): { [s: string]: boolean } {  
        if (control.value.match(/^\d/)) {  
            return {checkFirstCharacterValidator: true};  
        }       
    }

    function checkNumericValidator(control: Control): { [s: string]: boolean } {  
        if (control.value.match(/\d,\d/)) {  
            return {checkNumericValidator: true};  
        }       
    }

}