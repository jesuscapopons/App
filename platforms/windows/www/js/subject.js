class Subject {
  constructor(name) {
    this.name = name;
    this.code =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
     
  }
  
  this.getCode= function()
  {
	  return this.code;
	  
  }
  
  
}
