<template>
  <el-dialog
    :title="`${roleForm.id ? '编辑':'新增'}角色`"
    :visible="dialogVisible"
    width="600px"
    @close="handleClose"
  >
    <el-form
      ref="roleDialogForm"
      label-width="80px"
      :model="roleForm"
      :rules="rules"
    >
      <el-form-item
        prop="name"
        label="角色"
      >
        <el-input v-model="roleForm.name" />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="roleForm.description" type="textarea" row="3" />
      </el-form-item>
    </el-form>
    <el-row slot="footer" class="dialog-footer" type="flex" justify="center" align="middle">
      <el-button @click="handleClose">取 消</el-button>
      <el-button v-loading="loading" type="primary" @click="handleSubmit">确 定</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import { addRole, updateRole } from '@/api/setting'
export default {
  name: 'Hrsaas35sRoleDialog',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      roleForm: {
        name: '',
        description: ''
      },
      rules: {
        name: [{
          required: true, message: '角色必填', trigger: 'blur'
        }]
      },
      loading: false
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:dialog-visible', false)
      this.$refs.roleDialogForm.resetFields()
      this.roleForm = {
        name: '',
        description: ''
      }
    },
    async handleSubmit() {
      try {
        await this.$refs.roleDialogForm.validate()
        this.loading = true
        this.roleForm.id ? await updateRole(this.roleForm) : await addRole(this.roleForm)
        await addRole(this.roleForm)
        this.$message.success(this.roleForm.id ? '角色编辑成功' : '角色新增成功')
        this.handleClose()
        this.$parent.getRoleList()
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
