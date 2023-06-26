import { Button, Divider, Drawer, NumberInput, ScrollArea, Select, Text, TextInput } from '@mantine/core'

interface SetupWalletProps {
    drawerOpen: boolean
    close: () => void
    openSuccessModal: React.Dispatch<React.SetStateAction<boolean>>
    callback: () => void
}

const SetupWallet = ({ drawerOpen, callback, close, openSuccessModal }: SetupWalletProps) => {
    return (
        <Drawer
            opened={drawerOpen}
            withinPortal={false}
            onClose={close}
            padding="sm"
            position="right"
            size={400}
            className='wallet-drawer'>
            {drawerOpen &&
                <ScrollArea>
                    <span className="title">Set up your Dozzia wallet</span>
                    <Divider my={20} />
                    
                    <span className="title">Primary bank account</span>
                    <span className="acc-title">
                        Add your school’s primary bank account details
                    </span>

                    <form className="wallet-form">
                        <Select
                            size="sm"
                            label="Select bank"
                            placeholder="Select receiver’s bank"
                            data={[
                                { value: "gtb", label: "GTB" },
                                { value: "keystone", label: "Keytone" },
                                { value: "first bank", label: "First Bank" },
                                { value: "wema", label: "Wema" },
                            ]}
                        />

                        <NumberInput
                            size="sm"
                            mt="sm"
                            hideControls
                            label="Account number"
                        />

                        <TextInput
                            size="md"
                            mt="sm"
                            label="Account name"
                            placeholder="Enter BVN"
                        />

                        <span className="title">Card details</span>
                        <span className="card-details-desc">
                            Add your school’s primary bank account details
                        </span>

                        <NumberInput
                            size="sm"
                            hideControls
                            label="Card number"
                            placeholder="0000 0000 0000 0000"
                        />

                        <div className="card-details-inputs">
                            <NumberInput
                                size="sm"
                                mt="sm"
                                hideControls
                                label="Exp date name"
                                placeholder="MM /  YY"
                            />

                            <NumberInput
                                size="sm"
                                mt="sm"
                                hideControls
                                label="Account name"
                                placeholder="Security code"
                            />
                        </div>

                        <div className="btn">
                            <Button size="md" mt="lg"
                            onClick={() => openSuccessModal(true)}>
                                Save
                            </Button>
                        </div>
                    </form>

                </ScrollArea>}
        </Drawer>
    )
}

export default SetupWallet
