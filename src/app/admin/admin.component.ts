import { Component } from '@angular/core';
import { DocumentData, QueryDocumentSnapshot, addDoc, collection, deleteDoc, doc, getDocs, query, setDoc } from 'firebase/firestore';
import { FirestoreService } from '../firestore.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.less'
})
export class AdminComponent {

  key?:string;
  document?:QueryDocumentSnapshot<DocumentData>;

  data?:string;

  documents:QueryDocumentSnapshot<DocumentData>[]=[];



  constructor(public firestore:FirestoreService){

  }

  edit(doc:any){
    this.document=doc;
    this.data = JSON.stringify(this.document?.data(),null,1)
  }

  fetch(){
    if(!this.key) return;
    this.documents=[];
    let collect =  collection(this.firestore.firestore, this.key);
    const q = query(collect);
    getDocs(q).then(res=>{
      res.forEach(doc=>{
        this.documents.push(doc);
      });
    });
  }

  async save(){
    if(!this.data)return;
    if(!this.key || !this.document)return;
    var d = undefined;
    try{
      d = JSON.parse(this.data);
    }catch(err){
      console.error(err);
      alert("Error while parsing document data, please check and retry");
      return;
    }
    if(this.document?.id){
      await setDoc(doc(collection(this.firestore.firestore,this.key), this.document?.id),d);
      alert("Document Updated.");
    }else if(d.id){
      await setDoc(doc(collection(this.firestore.firestore,this.key), d.id),d);
      alert("Document Added.");
    }else{
      await addDoc(collection(this.firestore.firestore,this.key),d);
      alert("Document Added.");
    }
    
    this.document=undefined;

  }


  async delete(){
    if(!this.data)return;
    if(!this.key || !this.document)return;
    await deleteDoc(doc(collection(this.firestore.firestore,this.key), this.document?.id));
    this.document=undefined;
  }

}
