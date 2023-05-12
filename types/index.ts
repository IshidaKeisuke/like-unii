export interface Interview {
	id: number;
	company_id: number;
	title: string;
	description: string;
	execution_time: number;
	price: number;
	start_time: Date;
	end_time: Date;
	created_at: Date;
	updated_at: Date;
}

export interface User {
	id: number;
	line_id: string;
	count: number;
	created_at: Date;
}

export interface Match {
	id: number;
	user_id: number;
	company_id: number;
	status: number;
	created_at: Date;	
}
