# DefaultConcurrency



## `agenda.defaultConcurrency(concurrency)`

{% hint style="info" %}
The `defaultConcurrency` method sets the default number of jobs that can be processed concurrently by a `Agenda` instance. This setting is crucial for controlling how many jobs are run at the same time, affecting resource utilization and job throughput.
{% endhint %}

### Example Usage

```typescript
const agenda = new Agenda();

// Set the default concurrency for job processing to 3
agenda.defaultConcurrency(3);


//or new Agenda({ defaultConcurrency: 3 });
```



### Parameters

* **`concurrency`** (`number`): The default number of concurrent jobs that the system should process. This value sets a baseline for job processing unless explicitly overridden by specific jobs.

### Returns

* **`Agenda`**: Returns the `Agenda` instance, allowing for chaining of additional method calls.



