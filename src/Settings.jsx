import {
  Modal,
  Group,
  Text,
  Stack,
  Grid,
  TextInput,
  MultiSelect,
  Select,
  Button,
  Avatar,
  Box,
  Badge,
  ActionIcon,
  Paper,
  ThemeIcon,
} from '@mantine/core';
import {
  IconUserPlus,
  IconDeviceDesktop,
  IconDeviceMobile,
  IconMail,
  IconChevronLeft,
  IconSend,
} from '@tabler/icons-react';

export function Settings({
  opened,
  onClose,
  inviteEmployeeForm,
  selectedPlatform,
  setSelectedPlatform,
  selectedEmployee,
  handleEmployeeInvite,
  invitingEmployee,
  FEATURES,
  EMPLOYEE_ROLE_OPTIONS,
}) {
  const handleClose = () => {
    onClose();
    inviteEmployeeForm.reset();
    setSelectedPlatform(null);
  };

  const handleBack = () => setSelectedPlatform(null);

  const platformConfig = {
    web: {
      label: 'Web user',
      icon: <IconDeviceDesktop size={18} />,
      color: 'blue',
      description: 'Browser-based access with full feature set',
    },
    mobile: {
      label: 'Mobile user',
      icon: <IconDeviceMobile size={18} />,
      color: 'teal',
      description: 'App-based access for on-the-go use',
    },
  };

  const employeeInitial =
    (selectedEmployee?.name || selectedEmployee?.email)?.charAt(0)?.toUpperCase() || 'E';

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={
        <Group gap="sm">
          <ThemeIcon variant="light" color="gray" size="md" radius="md">
            <IconUserPlus size={16} />
          </ThemeIcon>
          <Text fw={500} size="sm">
            Invite employee to team
          </Text>
        </Group>
      }
      size="md"
      radius="lg"
      padding="0"
    >
      {!selectedPlatform ? (
        // ── Step 1: Platform Selection ──
        <Stack gap="md" p="xl">
          <Text size="sm" c="dimmed">
            Select the platform this employee will be accessing the system from.
          </Text>

          <Grid>
            {Object.entries(platformConfig).map(([key, config]) => (
              <Grid.Col span={6} key={key}>
                <Paper
                  withBorder
                  radius="lg"
                  p="lg"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedPlatform(key)}
                  sx={(theme) => ({
                    transition: 'border-color 0.15s, box-shadow 0.15s',
                    '&:hover': {
                      borderColor: theme.colors[config.color][4],
                      boxShadow: theme.shadows.sm,
                    },
                  })}
                >
                  <Stack gap="sm">
                    <ThemeIcon
                      variant="light"
                      color={config.color}
                      size="xl"
                      radius="md"
                    >
                      {config.icon}
                    </ThemeIcon>
                    <Box>
                      <Text size="sm" fw={500}>
                        {config.label}
                      </Text>
                      <Text size="xs" c="dimmed" mt={2}>
                        {config.description}
                      </Text>
                    </Box>
                  </Stack>
                </Paper>
              </Grid.Col>
            ))}
          </Grid>
        </Stack>
      ) : (
        // ── Step 2: Invite Form ──
        <form onSubmit={inviteEmployeeForm.onSubmit(handleEmployeeInvite)}>
          <Stack gap="md" p="xl">

            {/* Employee Info Card */}
            {selectedEmployee && (
              <Paper withBorder radius="lg" p="md" bg="gray.0">
                <Group justify="space-between" align="flex-start">
                  <Group gap="sm">
                    <Avatar size="md" color="blue" radius="xl">
                      {employeeInitial}
                    </Avatar>
                    <Box>
                      <Text size="sm" fw={500}>
                        {selectedEmployee.name || 'No Name'}
                      </Text>
                      <Text size="xs" c="dimmed">
                        #{selectedEmployee.employeeNum || 'Not Set'} ·{' '}
                        {selectedEmployee.department || 'No Department'}
                      </Text>
                    </Box>
                  </Group>
                  <Badge
                    size="sm"
                    variant="light"
                    color={platformConfig[selectedPlatform]?.color}
                    radius="xl"
                  >
                    {platformConfig[selectedPlatform]?.label}
                  </Badge>
                </Group>
              </Paper>
            )}

            {/* Hidden Fields */}
            <input type="hidden" {...inviteEmployeeForm.getInputProps('userId')} />
            <input
              type="hidden"
              {...inviteEmployeeForm.getInputProps('platform')}
              value={selectedPlatform}
            />

            {/* Name + Email */}
            <Grid gutter="sm">
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <TextInput
                  label="Full name"
                  disabled
                  placeholder="Enter full name"
                  size="sm"
                  {...inviteEmployeeForm.getInputProps('name')}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <TextInput
                  label="Email address"
                  type="email"
                  disabled
                  placeholder="Enter email address"
                  size="sm"
                  {...inviteEmployeeForm.getInputProps('email')}
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <TextInput
                  label="Position"
                  disabled
                  placeholder="Enter position"
                  size="sm"
                  {...inviteEmployeeForm.getInputProps('position')}
                />
              </Grid.Col>

              {/* Web-only Fields */}
              {selectedPlatform === 'web' && (
                <>
                  <Grid.Col span={12}>
                    <MultiSelect
                      label="Features to assign"
                      placeholder="Pick features"
                      size="sm"
                      data={FEATURES?.map((f) => ({
                        value: f.value,
                        label: f.label,
                        description: f.description,
                      }))}
                      searchable
                      nothingFoundMessage="Nothing found..."
                      {...inviteEmployeeForm.getInputProps('features')}
                    />
                  </Grid.Col>
                  <Grid.Col span={12}>
                    <Select
                      label="User role"
                      placeholder="Select a role"
                      size="sm"
                      data={EMPLOYEE_ROLE_OPTIONS.map((role) => ({
                        value: role.value,
                        label: role.label,
                      }))}
                      searchable
                      nothingFoundMessage="Nothing found..."
                      {...inviteEmployeeForm.getInputProps('role')}
                    />
                  </Grid.Col>
                </>
              )}
            </Grid>

            {/* Footer Buttons */}
            <Group justify="space-between" pt="sm" style={{ borderTop: '1px solid var(--mantine-color-gray-2)' }}>
              <Button
                variant="subtle"
                color="gray"
                leftSection={<IconChevronLeft size={14} />}
                onClick={handleBack}
                size="sm"
              >
                Back
              </Button>
              <Button
                type="submit"
                leftSection={<IconSend size={14} />}
                loading={invitingEmployee}
                size="sm"
              >
                Send invitation
              </Button>
            </Group>
          </Stack>
        </form>
      )}
    </Modal>
  );
}
