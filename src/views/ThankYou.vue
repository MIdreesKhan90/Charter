<script setup>
import HeaderLayout from "@/layouts/HeaderLayout.vue";
import FooterLayout from "@/layouts/FooterLayout.vue";
</script>

<template>
  <HeaderLayout :fixed="false" />

  <div class="thankyou">
    <h1>Thank you.</h1>
    <p class="gratitude">
      Your request has been successfully received. A confirmation email is waiting for you in your inbox, Your personal
      executive will contact you shortly.
    </p>
    <div class="contact-us">
      <p>You can always contact us on</p>
      <a href="https://wa.me/14344436040" target="_blank">
        <i class="icon-whatsapp"></i>
        +1 (434) 443-6040
      </a>
      <a href="tel:+13325701">
        <i class="icon-phone"></i>
        +1 (844) 332-5701
      </a>
    </div>
    <RouterLink class="btn btn-sm btn-primary" to="/">Back to Home page</RouterLink>
  </div>

  <FooterLayout />
</template>
