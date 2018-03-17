var app = new Vue({
  el: '#app',
  data: {
    items: [],
    text: '',
    show: 'all',
    drag: {},
    priority: '',
  },
  computed: {
    created: function() {
      this.getItems();
    },
    activeItems: function() {
      return this.items.filter(function(item) {
	     return !item.completed;
      });
    },
    filteredItems: function() {
      if (this.show === 'active')
	     return this.items.filter(function(item) {
	       return !item.completed;
	});
      if (this.show === 'completed')
	     return this.items.filter(function(item) {
	       return item.completed;
	});
      return this.items;
    },
  },
  methods: {
    getItems: function() {
      axios.get("/api/items").then(response => {
        this.items = response.data;
        return true;
      }).catch(err => {
      });
    },
    addItem: function() {
      axios.post("/api/items", {
      text: this.text,
      priority: parseInt(this.priority),
      completed: false
      }).then(response => {
        this.text = "";
        this.priority = "";
        this.getItems();
        return true;
      }).catch(err => {
      });
    },
    completeItem: function(item) {
      axios.put("/api/items/" + item.id, {
        text: item.text,
        priority: item.priority,
        completed: !item.completed,
        orderChange: false,
      }).then(response => {
        return true;
      }).catch(err => {
      });
    },
    deleteItem: function(item) {
      axios.delete("/api/items/" + item.id).then(response => {
        this.getItems();
        return true;
      }).catch(err => {
      });
    },
    showAll: function() {
      this.show = 'all';
    },
    showActive: function() {
      this.show = 'active';
    },
    showCompleted: function() {
      this.show = 'completed';
    },
    deleteCompleted: function() {
      this.items.forEach(item => {
        if (item.completed)
          this.deleteItem(item)
      });
    },
    dragItem: function(item) {
      this.drag = item;
    },
    dropItem: function(item) {
      axios.put("/api/items/" + this.drag.id, {
        text: this.drag.text,
        priority: this.drag.priority,
        completed: this.drag.completed,
        orderChange: true,
        orderTarget: item.id
      }).then(response => {
        this.getItems();
        return true;
      }).catch(err => {
      });
    },
    upPriority: function(item) {
      if(item.priority < 2) {
        axios.put("/api/items/" + item.id, {
          text: item.text,
          priority: item.priority + 1,
          completed: item.completed,
          orderChange: false,
        }).then(response => {
          this.getItems();
          return true;
      }).catch(err => {
      });
    }
    },
    downPriority: function(item) {
      if(item.priority > 1) {
        axios.put("/api/items/" + item.id, {
          text: item.text,
          priority: item.priority - 1,
          completed: item.completed,
          orderChange: false,
        }).then(response => {
          this.getItems();
          return true;
      }).catch(err => {
      });
    }
    },
    sortPriority: function() {
      this.items.sort(function(first,second) {
        return first.priority - second.priority;
      });
    }
  }
});
