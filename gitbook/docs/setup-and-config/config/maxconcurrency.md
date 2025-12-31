# MaxConcurrency



## `agenda.maxConcurrency(concurrency)`

{% hint style="info" %}
The `maxConcurrency` method sets the maximum number of jobs that can be processed concurrently across the entire `Agenda` instance, regardless of job type. This global setting is crucial for controlling overall system load and ensuring that job processing does not overwhelm system resources.
{% endhint %}

### Example Usage

```typescript
const agenda = new Agenda();

// Set the default concurrency for job processing to 3
agenda.maxConcurrency(10);


//or new Agenda({ maxConcurrenc: 10 });
```



### Parameters

* **`concurrency`** (`number`): The maximum number of concurrent jobs allowed. This setting applies to all job types handled by the `Agenda` instance.

### Returns

* **`Agenda`**: Returns the instance of the `Agenda` class, enabling method chaining.



