// MVC

// Data生成寫在model
var model = (function() {
    
    // 用戶輸入的資料彙整
    
    var item = function(id, name, value) {
        
      this.id = id;
      this.name = name;
      this.value = value;
    };
    
    // 存放用戶資料的數組
    
    var data = {
        
      allItems: [],
      totals: 0 
    };
    
    //價格加總
    
    var calculateTotal = function() {
        
        var sum = 0;
        
        data.allItems.forEach(function(currentVal) {
            
            sum += currentVal.value;

        });
        
        data.totals = sum;
        return sum;
        
    };
    
    //使外部能取用model的prop
    
    return {
        
        addItem: function(name, value) {
            
            var ID;
            
            //判斷表單中是否已經有項目存在
            
            if(data.allItems.length > 0) {
                
                ID = data.allItems[data.allItems.length - 1].id + 1;
                
            } else {
                
                ID = 0;
            }
            
            //創建一個物件儲存單筆資料的ID, name , value
            
            var newItem = new item(ID, name, value);
            
            data.allItems.push(newItem);
            
            return newItem;
            
        },
        
        calculateSum: function() {
            
            return calculateTotal();

        },
        
        // 刪除數據資料
        
        deleteItem: function(id) {
            
            var ids = data.allItems.map(function(currentVal) {
                
                return currentVal.id;
            });
            
            var index = ids.indexOf(parseInt(id, 10));
            
            if(index >= 0) {
                
                data.allItems.splice(index, 1);
            }

        },
        
        test: function() {
            
            console.log(data);
        }
    };
    
    
}());

// 連結DOM
// 將data顯示在頁面
var view = (function() {
    
    var DOMStrings = {
        
        name: '.item-name',
        value: '.item-value',
        btn: '.bought_btn',
        list: '.bought_list',
        sumLabel: '.total_value',
        container: '.container',
        month: '.month'
    };
    
    
    // 格式化價格表示
    
    var formatting = function(number) {
        
        number = number.toFixed(2);
        
        // regular expression 將價格每三位加上一個逗號
        
        number = number.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
        
        return number;
        
    };
    
    // 使外部能取用
    
    return {
        
        getInfo: function() {
            
            return {
                
                name: document.querySelector(DOMStrings.name).value,
                value: parseFloat(document.querySelector(DOMStrings.value).value)
            };
        },
        
        addListItems: function(object) {
            
            var newHTML;
            
            var element = DOMStrings.list;
            
            var html = '<div class="item clearfix" id="%id%"><div class="item_name">%name%</div><div class="right clearfix"><div class="item_value">%value%</div><div class="delete"><button class="delete_btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            
            newHTML = html.replace('%id%', object.id);
            newHTML = newHTML.replace('%name%', object.name);
            newHTML = newHTML.replace('%value%', formatting(object.value) + ' 元');
            
            document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);
        },
        
        //用戶輸入資訊後，輸入框資料歸零，將游標停在物品欄
        
        clearInput: function() {
            
            var inputs = document.querySelectorAll(DOMStrings.name + ',' + DOMStrings.value);
            
            var inputsArray = Array.prototype.slice.call(inputs);
            
            inputsArray.forEach(function(currentVal) {
                
                currentVal.value = '';
            });
            
            inputsArray[0].focus();
        },
        
        displaySum: function(sum) {
            
            document.querySelector(DOMStrings.sumLabel).textContent = formatting(sum) + ' 元';
        },
        
        displayMonth: function() {
            
            var now = new Date();
            
            var year = now.getFullYear();
            
            var month = now.getMonth() + 1;
            
            document.querySelector(DOMStrings.month).textContent = year + ' 年 ' + month + ' 月';
            
        },
        
        getDOMStrings: function() {
        
            return DOMStrings;
        },
        
        deleteListItem: function(id) {
            
            var element = document.getElementById(id);
            
            element.parentNode.removeChild(element);
            
        }
    };
    
}());

//傳遞data的媒介
var controller = (function(m, v) {
    
    // 頁面加載時，加入eventlistener
    
    var setupEventListener = function() {
        
        var DOMStrings = view.getDOMStrings();
    
        document.querySelector(DOMStrings.btn).addEventListener('click', addItems);

        //按下enter即加入清單

        document.addEventListener('keypress', function(event) {

            //加入event.which => 適應不同瀏覽器
            if(event.keyCode === 13 || event.which === 13) {
                addItems();
            }
        });
        
        // 點擊刪除按鈕，刪除資料
        
        document.querySelector(DOMStrings.container).addEventListener('click', deleteItem);
        
    };
    
    // 傳送價格總額
    
    var updateTotal = function() {
        
      var sum = model.calculateSum();
      view.displaySum(sum);
    };
    
    //取得用戶輸入的資訊
    var addItems = function() {
        
        var input = view.getInfo();
        
        if(input.name !== '' && !isNaN(input.value) && input.value > 0) {
            
            var newItems = model.addItem(input.name, input.value);
        
            view.addListItems(newItems);
        
            view.clearInput();
            
            updateTotal();
        }
  
    };
    
    // 刪除輸入資訊
    
    var deleteItem = function(event) {
        
        // 找到欲刪除項目的id
        
        var itemID = event.target.parentNode.parentNode.parentNode.id;
        if(itemID == '') {
            itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        }
        
        model.deleteItem(itemID);
        view.deleteListItem(itemID);
        
        updateTotal();
    };
    
    // 使外部能取用prop
    
    return {
        
      init: function() {
          
          console.log("APP started!!");
          view.displayMonth();
          setupEventListener();
      }  
    };
    

}(model, view));




controller.init();