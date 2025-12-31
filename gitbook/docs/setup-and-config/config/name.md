# Name



## `agenda.name(name)`

{% hint style="info" %}
The `name` method of the `Agenda` class allows setting or updating the name of the job queue. This name can be used for identification and management purposes within applications that may handle multiple queues.
{% endhint %}

### Example Usage

```typescript
const agenda = new Agenda();
agenda.name('emailProcessingQueue');

//or new Agenda({ name:'emailProcessingQueue' });
```

### Parameters

* **`name`** (`string`): The name to assign to the Agenda instance's job queue.

### Returns

* **`Agenda`**: Returns the instance of the `Agenda` class, allowing for method chaining.

####
