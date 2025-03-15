<template>
    
        login
        <button @click="handleLogin">login</button>
</template>

<script setup>

const handleLogin=()=>{
        localStorage.setItem("token","kerwin")
}
</script>