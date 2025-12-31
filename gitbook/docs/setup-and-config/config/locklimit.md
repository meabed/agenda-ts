# LockLimit



## `agenda.lockLimit(limit)`

{% hint style="info" %}
The `lockLimit` method sets the maximum number of jobs that can be locked by the `Agenda` instance at any one time. This is a global setting affecting all job processing, helping to control job concurrency and prevent overload.
{% endhint %}

### Example Usage

```typescript
const agenda = new Agenda();

// Set a global lock limit to prevent too many jobs from being locked at the same time
agenda.lockLimit(5);


//or new Agenda({ lockLimit: 5 });
```



### Parameters

* **`limit`** (`number`): The maximum number of jobs that can be locked simultaneously across the system.

### Returns

* **`Agenda`**: Returns the `Agenda` instance, enabling method chaining.



