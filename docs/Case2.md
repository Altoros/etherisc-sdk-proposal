## Apartment booking website
![](/docs/img/case2-step1.jpg)

Select apartment
![](/docs/img/case2-step2.jpg)

Paste code in /examples/view/apartment-booking/payment.html after "Phone number"
```
<script
  src="//localhost:3333/Etherisc-SDK.min.js"
  data-only-premium="true"
  class="etherisc-script"
>
</script>
```

Paste code in /examples/view/apartment-booking/success.html after "Order details"
```
<script
  src="//localhost:3333/Etherisc-SDK.min.js"
  data-only-payment="true"
  class="etherisc-script"
>
</script>
```

Etherisc component is displayed as a part of payment form
![](/docs/img/case2-step3.jpg)

And after successful payment
![](/docs/img/case2-step4.jpg)
