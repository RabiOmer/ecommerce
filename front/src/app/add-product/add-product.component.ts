import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { ApiService } from '../api.service';
import { ShareDataService } from '../share-data.service';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  
  @Input() editProduct:string;

  newProduct:any ={
    name: '',
    catgory: '',
    catgorytemp:'',
    price: '',
    description: '',
    company:'',
    _id: ''
  }
  err:any =[];
  url:any = null
  categories:any = null;
  fileImage:File = null;
  fd:any = new FormData(); 

  constructor(private api:ApiService,private share:ShareDataService) { 
    this.newProduct._id = this.editProduct;

    this.api.getAllGategories().subscribe(
      res=>{
        if(res.success){
          this.categories = res.data;
        }
      }
    )

  }

  ngOnInit() {
  }


  ValidateForm(edit){
    if(edit){
      this.newProduct = this.editProduct;
      this.newProduct.id = this.newProduct._id;
    }
    this.err=[];
    if(this.newProduct.name ==''){
      this.err.push('missing name');
      if(!isNaN){
        this.err.push('name cant be a number');
      }
    }
    if(this.newProduct.catgorytemp ==''){
      this.err.push('missing catgory');
    }else{
      for(let c of this.categories){
          if(c.name == this.newProduct.catgorytemp){
            this.newProduct.catgory = c._id;
          }
        }
      }
    if(this.newProduct.company ==''){
      this.err.push('missing company');
      if(!isNaN){
        this.err.push('name cant be a company');
      }
    }
    if(this.newProduct.description ==''){
      this.err.push('missing discription');
      if(!isNaN){
        this.err.push('name cant be a discriptin');
      }
    }
    if(this.fileImage == null){
      this.err.push(' ivalid img');
    }
    if(this.err=[]){
      this.fd.append('name',this.newProduct.name);
      this.fd.append('catgory',this.newProduct.catgory._id);
      this.fd.append('company',this.newProduct.company);
      this.fd.append('price',this.newProduct.price);
      this.fd.append('description',this.newProduct.description);
      if(!edit){
        this.sendtoServer(true);
      }else{
        this.fd.append('id',this.newProduct.id);
        this.sendtoServer(false);
      }
    }
  }
  cleanData(){
    this.url ='';
    this.newProduct.name='';
    this.newProduct.catgory='';
    this.newProduct.catgorytemp='';
    this.newProduct.company='';
    this.newProduct.price=null;
    this.newProduct.description='';
  }
  OnfileSeleted(e){
    this.fileImage=e.target.files[0];
    if(this.fileImage.type=="image/jpeg" ||this.fileImage.type== "image/png"){
      let reader = new FileReader();

      reader.onload = (e:any) => {
        this.url=e.target.result;
      }
       reader.readAsDataURL(e.target.files[0]);
      this.fd.append('image',this.fileImage,this.fileImage.name);
    }else{
      this.err.push('invalid img');
      this.fileImage = null;
    }
  }
  sendtoServer(add){
    if(add){
      this.api.addnewProduct(this.fd).subscribe(
        res=>{
          if(res.success){
            res.data.catgory = this.newProduct.catgorytemp;
            this.share.AddproducttoObj(res.data);
            this.cleanData;
          }else{
          }
          this.fd = new FormData();
        }
      );
    }else{
      this.api.updateProduct(this.fd).subscribe(
        res=>{
          if(res.success){
            this.share.AddproducttoObj(res.data);
          }
        },
        err=>{

        }
      )
      this.fd = new FormData();
    }
  }
}
