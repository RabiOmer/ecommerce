import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productFilter'
})
export class ProductPipe implements PipeTransform {

  transform(products: any, serachTerm?: any): any {
        if(!products || !serachTerm){
            return products;
        }
        return products.filter(products =>
        products.name.toLowerCase().indexOf(serachTerm.toLocaleLowerCase()) !== -1)
  }

}
