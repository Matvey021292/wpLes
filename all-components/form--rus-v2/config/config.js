{
  "forms": {
    "activate_form" : {
      "hidden" : {
        "firstname": "unknown",
        "register-currency": "ru",
        "conditions":""
      },
      "modal": false
    },
    "register_form" : {
      "hidden" : {
        "firstname": "unknown",
        "register-currency": ""
      },
      "modal": false
    },
    "call_back_form" : {
      "hidden" : {
        "firstname": "unknown",
        "lastname": "unknown",
        "email": "unknown",
        "age": "18",
        "register-currency": "ru"
      },
      "modal": false
    }
  },
"land_name" : "landName",
"registration" : false,
"iframe" : false,
"source-id" : "0",
"style" : "form { text-align: center;}",
"modal-template" : "<div id='postModal' class='modal fade' tabindex='-1' role='dialog'> <div class='modal-dialog' role='document'> <div class='modal-content'> <div class='modal-body'> <a type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></a><div class='alert' role='alert'></div></div></div></div></div>",
"inputs-template" : {
  "firstname" : "<div class='form_group--name'> <input data-validation-type='firstname' name='firstname' placeholder='Имя' required> <div class='error'></div></div>",
  "lastname" : "<div class='form_group--name'> <input data-validation-type='lastname' placeholder='Фамилия' name='lastname' value='' required> <div class='error'></div></div>",
  "email" : "<div class='form_group--email'> <input type='email' data-validation-type='email' name='email' placeholder='Email' required> <div class='error'></div></div>",
  "phone" : "<div class='form_input--group'><input  data-validation-type='phone' name='phone' placeholder='' required> <div class='error'></div></div>",
  "password" : "<div class='form_group--password'> <input class='valid' name='password' placeholder='Пароль' disabled='disabled' required> <div class='error'></div></div>",
  "conditions" : "<div class='checkbox-wrapper'> <label><input  class='inverted' required name='conditions' type='checkbox' data-validation-type='conditions'> Я согласен с <a href='/terms'>Клиентским соглашением</a></label> <div class='error'></div></div>",
  "age" : "<div class='checkbox-wrapper'> <label><input  class='inverted' required name='age' type='checkbox' data-validation-type='age'> Мне больше 18 лет</label> <div class='error'></div></div>",
  "register-currency" : "<div class='form_group--radio'><input class='form_group--radio-input' value='rub' id='radio-1' name='register-currency' checked='' type='radio'> <label for='radio-1'>Рубль</label> <input class='form_group--radio-input' value='usd' id='radio-2' name='register-currency' type='radio'> <label for='radio-2'>Доллар</label> <input class='form_group--radio-input' value='eur' id='radio-3' name='register-currency' type='radio'> <label for='radio-3'>Евро</label> </div>"
},
"main-template" : "<div class='form_group--hidden'> <input type='hidden' data-validation-type='clickid' name='clickid'> <input type='hidden' data-validation-type='affid' name='affid'> <input type='hidden' data-validation-type='subid' name='subid'> <input data-validation-type='offerid' name='offerid' type='hidden'> <input data-validation-type='transactionid' name='transactionid' type='hidden'> </div><div class='form_group--button'> <button class='send-form btn btn-primary ' type='submit'><span class='button--inner'>Зарегистрироваться</span> </button> <button type='button' class='btn btn-default close-form' data-dismiss='modal'> Назад</button> </div>",
"externalTrackers": [
    {
        "position": "head",
        "code": "console.log('head')"
    },    {
        "position": "body",
        "code": "console.log('body')"
    }
],
"externalTrackerEvents": [
    {
        "event": "load",
        "code": "console.log('load event')"
    },    {
        "event": "registration",
        "code": "console.log('registration event')"
    }
],
"backOffer": false,
"secondOffer": false
}

