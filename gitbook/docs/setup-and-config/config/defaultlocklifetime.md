# DefaultLockLifetime



## `agenda.defaultLockLifetime(ms)`

{% hint style="info" %}
The `defaultLockLifetime` method sets the default duration (in milliseconds) that a job can remain locked during processing before it is automatically released. This setting helps manage job recovery and ensures that jobs do not remain locked indefinitely if an error occurs or if the job processing is not completed as expected.
{% endhint %}

### Example Usage

```typescript
const agenda = new Agenda();

// Set the default lock lifetime to 5 minutes (300000 ms)
agenda.defaultLockLifetime(300000);

//or new Agenda({ defaultLockLifetime: 300000 });
```



### Parameters

* **`ms`** (`number`): The duration in milliseconds for how long jobs should be locked by default.
  * default: 600,000ms

### Returns

* **`Agenda`**: Returns the instance of the `Agenda` class, allowing for method chaining.



