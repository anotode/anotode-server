### Imports data from the user  
```
var mongoose = require('mongoose')

// column values should not be repeated. So normalization is to done.
var Highlight = new mongoose.Schema({
  user_id: {type:String, unique:true}
  text_id: {type:Integer, unique:true} // primary key
  title : String,
  text: String,
  url: String,
  timeDate: Integer, // unix time - resloves time zone synchronization.
  color:Integer,  // Use ToArgb and FromArgb to set and get the values.
  // hash :
  comment : String
  
})
```



```
var Tags = new mongoose.Schema({
	tag_id : {type: Integer, unique:true}
	name : {type: String, unique:true}
	text_id : {type: Integer, unique:true}  // foreign key.ß
})

module.exports = mongoose.model('User', Highlight)

```





// NOTE: Its not wise to change the Schema. So once this is verified fixed, There is no changing without any strong reason.

// TODO: This Schema should pass perfomance tests

// NOTE : You can denormalize DB by violating normalization rules to increase reporting speed.