# ProcessEvery



## `agenda.processEvery(interval)`

{% hint style="info" %}
The `processEvery` method of the `Agenda` class allows to configure the job processing interval, meaning the frequency at which Agenda will query the database looking for jobs that need to be processed.
{% endhint %}

### Example Usage

```typescript
const agenda = new Agenda();

// Configure the job processing interval to every 10 minutes
agenda.processEvery('10 minutes');

//or new Agenda({ processEvery:'10 minutes' });
```



### Parameters

* **`interval`** (`string`): The interval at which to process jobs, expressed in a human-readable format, such as '5 minutes', '1 hour', etc.

### Returns

* **`Agenda`**: Returns the instance of the `Agenda` class, facilitating method chaining.

